import { render, screen } from "@testing-library/react";

import AccountNav from "@/app/components/AccountNav";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("AccountNav", () => {
  it("marks the exact overview path as active", () => {
    mockUsePathname.mockReturnValue("/account");
    render(<AccountNav />);

    const overview = screen.getByRole("link", { name: "Overview" });
    expect(overview.className).toContain("border-nano-yellow");
    expect(overview.className).toContain("bg-nano-yellow/40");
    expect(overview.className).toContain("text-nano-text");

    const subscription = screen.getByRole("link", { name: "Subscription" });
    expect(subscription.className).toContain("border-gray-200");
  });

  it("marks nested subscription routes as active", () => {
    mockUsePathname.mockReturnValue("/account/subscription/upgrade");
    render(<AccountNav />);

    const subscription = screen.getByRole("link", { name: "Subscription" });
    expect(subscription.className).toContain("border-nano-yellow");

    const overview = screen.getByRole("link", { name: "Overview" });
    expect(overview.className).toContain("border-gray-200");
  });
});
