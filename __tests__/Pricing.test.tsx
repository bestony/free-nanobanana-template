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

import Pricing from "@/app/components/Pricing";

const mockUseSession = jest.fn();
const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

jest.mock("@/lib/auth-client", () => ({
  useSession: () => mockUseSession(),
}));

describe("Pricing", () => {
  const originalLocation = window.location;

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
    push.mockReset();
    mockUseSession.mockReset();
    mockUseState.mockImplementation(actualUseState);
    (global.fetch as jest.Mock | undefined) = undefined;
  });

  it("disables pro checkout while session is pending", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
    render(<Pricing />);

    const proButton = screen.getByRole("button", { name: "Upgrade to Pro" });
    expect(proButton).toBeDisabled();
  });

  it("redirects unauthenticated users to sign in or sign up", async () => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );
    expect(push).toHaveBeenCalledWith("/auth/sign-in");

    await userEvent.click(
      screen.getByRole("button", { name: "Start for free" }),
    );
    expect(push).toHaveBeenCalledWith("/auth/sign-up");
  });

  it("does nothing for free tier while session is pending", async () => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Start for free" }),
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("routes signed-in users to the generator for free tier", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Start for free" }),
    );
    expect(push).toHaveBeenCalledWith("/#generator");
  });

  it("ignores checkout when another tier is active", async () => {
    let callIndex = 0;
    mockUseState.mockImplementation((initial) => {
      callIndex += 1;
      const position = (callIndex - 1) % 2;
      if (position === 0) {
        return ["free", jest.fn()];
      }
      return [initial as string | null, jest.fn()];
    });

    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn();

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(global.fetch).not.toHaveBeenCalled();
    mockUseState.mockImplementation(actualUseState);
  });

  it("handles successful checkout and redirects", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://billing.example" }),
    });

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/billing/checkout", {
        method: "POST",
      });
    });
    expect(window.location.href).toBe("https://billing.example");
  });

  it("shows checkout error responses", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Checkout blocked." }),
    });

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(await screen.findByText("Checkout blocked.")).toBeInTheDocument();
  });

  it("uses a default message when checkout fails without payload", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to start checkout."),
    ).toBeInTheDocument();
  });

  it("uses a default message when checkout payload parsing fails", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("bad json");
      },
    });

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to start checkout."),
    ).toBeInTheDocument();
  });

  it("handles non-Error checkout failures", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockRejectedValue("nope");

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Unable to start checkout."),
    ).toBeInTheDocument();
  });

  it("handles missing checkout url", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<Pricing />);

    await userEvent.click(
      screen.getByRole("button", { name: "Upgrade to Pro" }),
    );

    expect(
      await screen.findByText("Checkout session missing."),
    ).toBeInTheDocument();
  });

  it("prevents duplicate checkout clicks while loading", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "user" } },
      isPending: false,
    });

    let resolveFetch: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    (global.fetch as jest.Mock) = jest.fn().mockReturnValue(fetchPromise);

    render(<Pricing />);

    const proButton = screen.getByRole("button", { name: "Upgrade to Pro" });
    await userEvent.click(proButton);

    await userEvent.click(proButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(proButton).toHaveTextContent("Redirecting...");

    await act(async () => {
      resolveFetch!({
        ok: true,
        json: async () => ({ url: "https://billing" }),
      });
    });
  });
});
