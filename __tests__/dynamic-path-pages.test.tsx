import { render, screen } from "@testing-library/react";

import AccountPage, {
  dynamicParams as accountDynamicParams,
  generateStaticParams as generateAccountParams,
} from "@/app/account/[path]/page";
import AuthPage, {
  dynamicParams as authDynamicParams,
  generateStaticParams as generateAuthParams,
} from "@/app/auth/[path]/page";
import OrganizationPage, {
  dynamicParams as orgDynamicParams,
  generateStaticParams as generateOrgParams,
} from "@/app/organization/[path]/page";

jest.mock("@daveyplate/better-auth-ui/server", () => ({
  authViewPaths: { signIn: "sign-in", signUp: "sign-up" },
  accountViewPaths: { settings: "settings", security: "security" },
  organizationViewPaths: { overview: "overview" },
}));

jest.mock("@daveyplate/better-auth-ui", () => ({
  AuthView: ({ path }: { path: string }) => (
    <div data-testid="auth-view" data-path={path} />
  ),
  AccountView: ({ path }: { path: string }) => (
    <div data-testid="account-view" data-path={path} />
  ),
  OrganizationView: ({ path }: { path: string }) => (
    <div data-testid="organization-view" data-path={path} />
  ),
}));

describe("Dynamic path pages", () => {
  it("generates static params for auth, account, and organization pages", () => {
    expect(generateAuthParams()).toEqual([
      { path: "sign-in" },
      { path: "sign-up" },
    ]);

    expect(generateAccountParams()).toEqual([
      { path: "settings" },
      { path: "security" },
    ]);

    expect(generateOrgParams()).toEqual([{ path: "overview" }]);
  });

  it("exports dynamicParams as false", () => {
    expect(authDynamicParams).toBe(false);
    expect(accountDynamicParams).toBe(false);
    expect(orgDynamicParams).toBe(false);
  });

  it("renders auth, account, and organization views with the path param", async () => {
    const authUi = await AuthPage({
      params: Promise.resolve({ path: "sign-in" }),
    });
    render(authUi);
    expect(screen.getByTestId("auth-view")).toHaveAttribute(
      "data-path",
      "sign-in",
    );

    const accountUi = await AccountPage({
      params: Promise.resolve({ path: "settings" }),
    });
    render(accountUi);
    expect(screen.getByTestId("account-view")).toHaveAttribute(
      "data-path",
      "settings",
    );

    const orgUi = await OrganizationPage({
      params: Promise.resolve({ path: "overview" }),
    });
    render(orgUi);
    expect(screen.getByTestId("organization-view")).toHaveAttribute(
      "data-path",
      "overview",
    );
  });
});
