import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavbarAuth from "@/app/components/NavbarAuth";

const mockUseSession = jest.fn();
const mockSignOut = jest.fn();

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: { signOut: () => mockSignOut() },
  useSession: () => mockUseSession(),
}));

describe("NavbarAuth", () => {
  beforeEach(() => {
    mockSignOut.mockReset();
    mockUseSession.mockReset();
  });

  it("renders a loading placeholder while pending", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
    const { container } = render(<NavbarAuth />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders sign-in and sign-up links when signed out", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
    render(<NavbarAuth />);

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/auth/sign-in",
    );
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/auth/sign-up",
    );
  });

  it("renders account link and handles sign out", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
      isPending: false,
    });
    mockSignOut.mockReturnValue(new Promise(() => {}));

    render(<NavbarAuth />);

    expect(screen.getByRole("link", { name: "Account" })).toHaveAttribute(
      "href",
      "/account",
    );

    const button = screen.getByRole("button", { name: "Sign out" });
    await userEvent.click(button);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(button).toHaveTextContent("Signing out...");
    });
  });

  it("resets sign-out state after completion", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
      isPending: false,
    });
    let resolveSignOut: () => void;
    const signOutPromise = new Promise<void>((resolve) => {
      resolveSignOut = resolve;
    });
    mockSignOut.mockReturnValue(signOutPromise);

    render(<NavbarAuth />);

    const button = screen.getByRole("button", { name: "Sign out" });
    await userEvent.click(button);

    expect(button).toHaveTextContent("Signing out...");
    await act(async () => {
      resolveSignOut!();
    });

    await waitFor(() => {
      expect(button).toHaveTextContent("Sign out");
    });
  });

  it("ignores sign out while already signing out", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
      isPending: false,
    });
    let resolveSignOut: () => void;
    const signOutPromise = new Promise<void>((resolve) => {
      resolveSignOut = resolve;
    });
    mockSignOut.mockReturnValue(signOutPromise);

    render(<NavbarAuth />);

    const button = screen.getByRole("button", { name: "Sign out" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent("Signing out...");
    });

    await userEvent.click(button);
    expect(mockSignOut).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveSignOut!();
    });
    await waitFor(() => {
      expect(button).toHaveTextContent("Sign out");
    });
  });
});
