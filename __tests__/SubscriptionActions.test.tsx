import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";

const mockUseState = jest.fn();

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useState: (initial: unknown) => mockUseState(initial),
  };
});

const actualUseState = jest.requireActual("react").useState;

import SubscriptionActions from "@/app/components/SubscriptionActions";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SubscriptionActions", () => {
  const originalLocation = window.location;
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

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    });
  });

  beforeEach(() => {
    mockUseState.mockClear();
    mockUseState.mockImplementation(actualUseState);
    (global.fetch as jest.Mock | undefined) = undefined;
  });

  it("starts checkout for free users", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://checkout" }),
    });

    render(<SubscriptionActions isPro={false} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/billing/checkout", {
        method: "POST",
      });
    });
    expect(window.location.href).toBe("https://checkout");
  });

  it("starts portal flow for pro users", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://portal" }),
    });

    render(<SubscriptionActions isPro />);

    await userEvent.click(
      screen.getByRole("button", { name: "Open billing portal" }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/billing/portal", {
        method: "POST",
      });
    });
    expect(window.location.href).toBe("https://portal");
  });

  it("shows API errors and missing url", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Billing failed." }),
    });

    render(<SubscriptionActions isPro={false} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(await screen.findByText("Billing failed.")).toBeInTheDocument();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Billing session missing."),
    ).toBeInTheDocument();
  });

  it("uses a default error when billing response omits message", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<SubscriptionActions isPro={false} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to open billing."),
    ).toBeInTheDocument();
  });

  it("uses a default error when billing payload parsing fails", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("bad json");
      },
    });

    render(<SubscriptionActions isPro={false} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to open billing."),
    ).toBeInTheDocument();
  });

  it("handles network failures", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockRejectedValue("nope");

    render(<SubscriptionActions isPro={false} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to open billing."),
    ).toBeInTheDocument();
  });

  it("prevents duplicate requests while loading", async () => {
    let resolveFetch: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    (global.fetch as jest.Mock) = jest.fn().mockReturnValue(fetchPromise);

    render(<SubscriptionActions isPro={false} />);

    const button = screen.getByRole("button", { name: "Upgrade to Pro" });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent("Redirecting...");

    await act(async () => {
      resolveFetch!({
        ok: true,
        json: async () => ({ url: "https://checkout" }),
      });
    });
  });

  it("ignores flows while already loading", () => {
    let callIndex = 0;
    mockUseState.mockImplementation((initial) => {
      callIndex += 1;
      const position = (callIndex - 1) % 2;
      if (position === 0) {
        return ["checkout", jest.fn()];
      }
      return [initial as string | null, jest.fn()];
    });

    (global.fetch as jest.Mock) = jest.fn();

    render(<SubscriptionActions isPro={false} />);

    const button = screen.getByRole("button");
    act(() => {
      getOnClick(button)();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
