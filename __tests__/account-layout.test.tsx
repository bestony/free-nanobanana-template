import { render, screen } from "@testing-library/react";

import AccountLayout from "@/app/account/layout";

const mockGetSession = jest.fn();
const mockHeaders = jest.fn();
const mockRedirect = jest.fn();

jest.mock("@/lib/auth", () => ({
  auth: {
    api: { getSession: (...args: unknown[]) => mockGetSession(...args) },
  },
}));

jest.mock("next/headers", () => ({
  headers: () => mockHeaders(),
}));

jest.mock("next/navigation", () => ({
  redirect: (path: string) => mockRedirect(path),
}));

jest.mock("@/app/components/Navbar", () => {
  function MockNavbar() {
    return <div data-testid="navbar" />;
  }

  MockNavbar.displayName = "Navbar";

  return MockNavbar;
});

jest.mock("@/app/components/Footer", () => {
  function MockFooter() {
    return <div data-testid="footer" />;
  }

  MockFooter.displayName = "Footer";

  return MockFooter;
});

jest.mock("@/app/components/AccountNav", () => {
  function MockAccountNav() {
    return <div data-testid="account-nav" />;
  }

  MockAccountNav.displayName = "AccountNav";

  return MockAccountNav;
});

describe("AccountLayout", () => {
  beforeEach(() => {
    mockGetSession.mockReset();
    mockHeaders.mockReset();
    mockRedirect.mockReset();
  });

  it("redirects when session is missing", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue(null);
    mockRedirect.mockImplementation(() => {
      throw new Error("redirect");
    });

    await expect(AccountLayout({ children: <div>Child</div> })).rejects.toThrow(
      "redirect",
    );
    expect(mockRedirect).toHaveBeenCalledWith("/auth/sign-in");
  });

  it("renders layout for authenticated users", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { email: "user@example.com" } });

    const ui = await AccountLayout({ children: <div>Child</div> });
    render(ui);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("account-nav")).toBeInTheDocument();
    expect(
      screen.getByText("Signed in as user@example.com"),
    ).toBeInTheDocument();
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
