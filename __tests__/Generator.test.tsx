import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUseState = jest.fn();

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useState: (initial: unknown) => mockUseState(initial),
  };
});

const actualUseState = jest.requireActual("react").useState;

import Generator from "@/app/components/Generator";

describe("Generator", () => {
  const getOnClick = (element: Element) => {
    const fiberKey = Object.keys(element).find((prop) =>
      prop.startsWith("__reactFiber$"),
    );
    const propsKey = Object.keys(element).find((prop) =>
      prop.startsWith("__reactProps$"),
    );
    const props =
      (fiberKey
        ? (element as unknown as Record<string, { memoizedProps?: unknown }>)[
            fiberKey
          ]?.memoizedProps
        : undefined) ||
      (propsKey
        ? (element as unknown as Record<string, unknown>)[propsKey]
        : undefined);
    if (
      !props ||
      typeof (props as { onClick?: unknown }).onClick !== "function"
    ) {
      throw new Error("React onClick not found");
    }
    return (props as { onClick: () => void }).onClick;
  };

  beforeEach(() => {
    mockUseState.mockClear();
    mockUseState.mockImplementation(actualUseState);
    (global.fetch as jest.Mock | undefined) = undefined;
  });

  it("updates helper text and prompt when selecting presets", async () => {
    render(<Generator />);

    const textarea = screen.getByPlaceholderText(
      /Describe the image you want to generate/i,
    );
    const presetButton = screen.getByRole("button", {
      name: "Cyberpunk Neon Cityscape",
    });

    await userEvent.click(presetButton);

    expect(textarea).toHaveValue(
      "A cinematic cyberpunk skyline at night, neon reflections on wet streets, ultra-detailed.",
    );
    expect(
      screen.getByText("Preset: Cyberpunk Neon Cityscape"),
    ).toBeInTheDocument();

    await userEvent.type(textarea, "Custom prompt");
    expect(
      screen.getByText("Describe the image you want to generate."),
    ).toBeInTheDocument();
  });

  it("uses fallback prompt when generating with empty input", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ image: "data:image/png;base64,abc" }),
    });

    render(<Generator />);

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const textarea = screen.getByPlaceholderText(
      /Describe the image you want to generate/i,
    );
    expect(textarea).toHaveValue(
      "A cinematic cyberpunk skyline at night, neon reflections on wet streets, ultra-detailed.",
    );
  });

  it("shows loading state while generating", async () => {
    let resolveFetch: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    (global.fetch as jest.Mock) = jest.fn().mockReturnValue(fetchPromise);

    render(<Generator />);

    const generateButton = screen.getByRole("button", {
      name: "Generate Image",
    });
    await userEvent.click(generateButton);

    expect(generateButton).toHaveTextContent("Generating...");
    expect(screen.getByText("Rendering your image...")).toBeInTheDocument();

    await act(async () => {
      resolveFetch!({
        ok: true,
        json: async () => ({ image: "data:image/png;base64,done" }),
      });
    });
  });

  it("ignores generate while already generating", async () => {
    let callIndex = 0;
    mockUseState.mockImplementation((initial) => {
      callIndex += 1;
      const position = (callIndex - 1) % 5;
      if (position === 3) {
        return [true, jest.fn()];
      }
      return [initial as string | number | null | boolean, jest.fn()];
    });

    (global.fetch as jest.Mock) = jest.fn();

    render(<Generator />);

    const generateButton = screen.getByRole("button", { name: /generat/i });
    act(() => {
      getOnClick(generateButton)();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("handles API errors and missing images", async () => {
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Generation failed." }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<Generator />);

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );
    expect(await screen.findByText("Generation failed.")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );
    expect(
      await screen.findByText("No image returned. Please try again."),
    ).toBeInTheDocument();
  });

  it("handles network failures", async () => {
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("oops"));

    render(<Generator />);

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );

    expect(
      await screen.findByText("Network error. Please try again."),
    ).toBeInTheDocument();
  });

  it("uses default error when API omits message", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<Generator />);

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );

    expect(await screen.findByText("Generation failed.")).toBeInTheDocument();
  });

  it("uses default error when error payload parsing fails", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("bad json");
      },
    });

    render(<Generator />);

    await userEvent.click(
      screen.getByRole("button", { name: "Generate Image" }),
    );

    expect(await screen.findByText("Generation failed.")).toBeInTheDocument();
  });
});
