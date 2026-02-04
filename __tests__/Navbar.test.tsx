import { render, screen } from "@testing-library/react";

import Navbar from "@/app/components/Navbar";

jest.mock("next/link", () => {
  function MockLink({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  MockLink.displayName = "Link";

  return {
    __esModule: true,
    default: MockLink,
  };
});

jest.mock("@/app/components/NavbarAuth", () => {
  function MockNavbarAuth() {
    return <div data-testid="navbar-auth" />;
  }

  MockNavbarAuth.displayName = "NavbarAuth";

  return MockNavbarAuth;
});

describe("Navbar", () => {
  it("renders primary navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText("Nanobanana")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Showcase" })).toHaveAttribute(
      "href",
      "/showcase",
    );
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery",
    );
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/faq",
    );
    expect(screen.getByTestId("navbar-auth")).toBeInTheDocument();
  });
});
