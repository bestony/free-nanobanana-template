import { render, screen } from "@testing-library/react";

import AccountPage, {
  dynamicParams as accountDynamicParams,
  generateStaticParams as accountStaticParams,
} from "@/app/account/[path]/page";
import AuthPage, {
  dynamicParams as authDynamicParams,
  generateStaticParams as authStaticParams,
} from "@/app/auth/[path]/page";
import OrganizationPage, {
  dynamicParams as orgDynamicParams,
  generateStaticParams as orgStaticParams,
} from "@/app/organization/[path]/page";

jest.mock("@daveyplate/better-auth-ui", () => ({
  AccountView: ({ path }: { path: string }) => (
    <div data-testid="account-view">{path}</div>
  ),
  AuthView: ({ path }: { path: string }) => (
    <div data-testid="auth-view">{path}</div>
  ),
  OrganizationView: ({ path }: { path: string }) => (
    <div data-testid="org-view">{path}</div>
  ),
}));

jest.mock("@daveyplate/better-auth-ui/server", () => ({
  accountViewPaths: { settings: "settings", security: "security" },
  authViewPaths: { signIn: "sign-in", signUp: "sign-up" },
  organizationViewPaths: { overview: "overview" },
}));

describe("dynamic pages", () => {
  it("exports static params and dynamicParams flags", () => {
    expect(authDynamicParams).toBe(false);
    expect(accountDynamicParams).toBe(false);
    expect(orgDynamicParams).toBe(false);

    expect(authStaticParams()).toEqual([
      { path: "sign-in" },
      { path: "sign-up" },
    ]);
    expect(accountStaticParams()).toEqual([
      { path: "settings" },
      { path: "security" },
    ]);
    expect(orgStaticParams()).toEqual([{ path: "overview" }]);
  });

  it("renders AuthView with the provided path", async () => {
    const ui = await AuthPage({
      params: Promise.resolve({ path: "sign-in" }),
    });
    render(ui);

    expect(screen.getByTestId("auth-view")).toHaveTextContent("sign-in");
  });

  it("renders OrganizationView with the provided path", async () => {
    const ui = await OrganizationPage({
      params: Promise.resolve({ path: "overview" }),
    });
    render(ui);

    expect(screen.getByTestId("org-view")).toHaveTextContent("overview");
  });

  it("renders AccountView with the provided path", async () => {
    const ui = await AccountPage({
      params: Promise.resolve({ path: "settings" }),
    });
    render(ui);

    expect(screen.getByTestId("account-view")).toHaveTextContent("settings");
  });
});
