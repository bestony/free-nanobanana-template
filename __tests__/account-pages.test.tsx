import { render, screen } from "@testing-library/react";

import AccountOverviewPage from "@/app/account/page";
import SubscriptionPage from "@/app/account/subscription/page";

const mockGetSession = jest.fn();
const mockGetSubscription = jest.fn();
const mockHeaders = jest.fn();

jest.mock("@/lib/auth", () => ({
  auth: {
    api: { getSession: (...args: unknown[]) => mockGetSession(...args) },
  },
}));

jest.mock("@/lib/billing", () => ({
  getSubscriptionByUserId: (...args: unknown[]) => mockGetSubscription(...args),
}));

jest.mock("next/headers", () => ({
  headers: () => mockHeaders(),
}));

jest.mock("@daveyplate/better-auth-ui", () => ({
  AccountView: () => <div data-testid="account-view" />,
}));

jest.mock("@/app/components/SubscriptionActions", () => ({
  __esModule: true,
  default: ({ isPro }: { isPro: boolean }) => (
    <div data-testid="subscription-actions" data-is-pro={isPro} />
  ),
}));

describe("Account overview page", () => {
  beforeEach(() => {
    mockGetSession.mockReset();
    mockGetSubscription.mockReset();
    mockHeaders.mockReset();
  });

  it("returns null when no session", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue(null);

    const ui = await AccountOverviewPage();
    expect(ui).toBeNull();
  });

  it("renders pro plan when subscription is active", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue({ status: "active" });

    const ui = await AccountOverviewPage();
    render(ui!);

    expect(screen.getByText("Pro plan")).toBeInTheDocument();
    expect(screen.getByText("Status: active")).toBeInTheDocument();
    expect(screen.getByTestId("account-view")).toBeInTheDocument();
  });

  it("renders free plan when subscription is missing", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue(null);

    const ui = await AccountOverviewPage();
    render(ui!);

    expect(screen.getByText("Free plan")).toBeInTheDocument();
    expect(screen.getByText("Status: inactive")).toBeInTheDocument();
    expect(screen.getByText("Next billing date: —")).toBeInTheDocument();
  });

  it("formats billing date when subscription has period end", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue({
      status: "trialing",
      currentPeriodEnd: new Date("2024-01-05T12:00:00.000Z"),
    });

    const ui = await AccountOverviewPage();
    render(ui!);

    expect(screen.getByText("Pro plan")).toBeInTheDocument();
    expect(
      screen.getByText("Next billing date: Jan 5, 2024"),
    ).toBeInTheDocument();
  });
});

describe("Subscription page", () => {
  beforeEach(() => {
    mockGetSession.mockReset();
    mockGetSubscription.mockReset();
    mockHeaders.mockReset();
  });

  it("returns null when no session", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue(null);

    const ui = await SubscriptionPage({});
    expect(ui).toBeNull();
  });

  it("renders banners and cancellation notice", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue({
      status: "trialing",
      cancelAtPeriodEnd: true,
      currentPeriodEnd: new Date("2024-01-02T00:00:00.000Z"),
    });

    const ui = await SubscriptionPage({
      searchParams: { success: "true", canceled: "true" },
    });
    render(ui!);

    expect(
      screen.getByText(
        "Subscription active! Your Pro benefits are now unlocked.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Checkout was canceled. You can restart anytime."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your plan will cancel at the end of the current period.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Pro plan")).toBeInTheDocument();
    expect(screen.getByTestId("subscription-actions")).toHaveAttribute(
      "data-is-pro",
      "true",
    );
  });

  it("renders free plan without banners when inactive", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue({
      status: "inactive",
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
    });

    const ui = await SubscriptionPage({});
    render(ui!);

    expect(
      screen.queryByText(
        "Subscription active! Your Pro benefits are now unlocked.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Checkout was canceled. You can restart anytime."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Your plan will cancel at the end of the current period.",
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Free plan")).toBeInTheDocument();
    expect(screen.getByText("Next billing date: —")).toBeInTheDocument();
    expect(screen.getByTestId("subscription-actions")).toHaveAttribute(
      "data-is-pro",
      "false",
    );
  });

  it("defaults to inactive when subscription status is missing", async () => {
    mockHeaders.mockResolvedValue(new Headers());
    mockGetSession.mockResolvedValue({ user: { id: "user" } });
    mockGetSubscription.mockResolvedValue({});

    const ui = await SubscriptionPage({});
    render(ui!);

    expect(screen.getByText("Status: inactive")).toBeInTheDocument();
    expect(screen.getByTestId("subscription-actions")).toHaveAttribute(
      "data-is-pro",
      "false",
    );
  });
});
