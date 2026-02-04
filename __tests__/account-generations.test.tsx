import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GenerationsPage from "@/app/account/generations/page";

describe("Account Generations page", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock | undefined) = undefined;
  });

  it("loads and shows empty state", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => null,
    });

    render(<GenerationsPage />);

    expect(screen.getByText("Loading generations...")).toBeInTheDocument();

    expect(
      await screen.findByText(
        "No generations yet. Start creating to build your history.",
      ),
    ).toBeInTheDocument();
  });

  it("shows API errors", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Unable to load generations." }),
    });

    render(<GenerationsPage />);

    expect(
      await screen.findByText("Unable to load generations."),
    ).toBeInTheDocument();
  });

  it("shows default error when API omits message", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<GenerationsPage />);

    expect(
      await screen.findByText("Unable to load generations."),
    ).toBeInTheDocument();
  });

  it("shows default error when payload parsing fails", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("bad json");
      },
    });

    render(<GenerationsPage />);

    expect(
      await screen.findByText("Unable to load generations."),
    ).toBeInTheDocument();
  });

  it("handles non-Error failures", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockRejectedValue("boom");

    render(<GenerationsPage />);

    expect(
      await screen.findByText("Unable to load generations."),
    ).toBeInTheDocument();
  });

  it("renders records and formats timestamps", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "rec_1",
            prompt: "First prompt",
            imageUrl: "https://example.com/one.png",
            createdAt: "2024-01-05T12:00:00.000Z",
          },
          {
            id: "rec_2",
            prompt: "Second prompt",
            imageUrl: "https://example.com/two.png",
            createdAt: "not-a-date",
          },
        ],
      }),
    });

    render(<GenerationsPage />);

    expect(await screen.findByText("First prompt")).toBeInTheDocument();
    expect(screen.getByText("Second prompt")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();

    const downloadLinks = screen.getAllByRole("link", { name: "Download" });
    expect(downloadLinks[0]).toHaveAttribute(
      "download",
      "nanobanana-rec_1.png",
    );
    expect(downloadLinks[1]).toHaveAttribute(
      "download",
      "nanobanana-rec_2.png",
    );
  });

  it("applies date filters and validates range", async () => {
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ data: [] }) });

    render(<GenerationsPage />);

    const fromInput = screen.getByLabelText("From") as HTMLInputElement;
    const toInput = screen.getByLabelText("To") as HTMLInputElement;

    await userEvent.type(fromInput, "2024-01-10");
    await userEvent.type(toInput, "2024-01-01");

    expect(
      screen.getByText(
        "Please make sure the end date is after the start date.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();

    await userEvent.clear(toInput);
    await userEvent.type(toInput, "2024-01-31");

    await userEvent.click(screen.getByRole("button", { name: "Apply" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/generations?from=2024-01-10&to=2024-01-31",
      );
    });
  });

  it("clears filters and reloads", async () => {
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ data: [] }) });

    render(<GenerationsPage />);

    const fromInput = screen.getByLabelText("From") as HTMLInputElement;
    const toInput = screen.getByLabelText("To") as HTMLInputElement;

    await userEvent.type(fromInput, "2024-01-01");
    await userEvent.type(toInput, "2024-01-05");

    await userEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(fromInput.value).toBe("");
    expect(toInput.value).toBe("");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/generations");
    });
  });
});
