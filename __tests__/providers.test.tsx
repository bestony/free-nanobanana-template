import { render } from "@testing-library/react";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

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

const mockAuthClient = { id: "auth-client" };

jest.mock("@/lib/auth-client", () => ({
  authClient: mockAuthClient,
}));

const authProviderSpy = jest.fn();

jest.mock("@daveyplate/better-auth-ui", () => ({
  AuthUIProvider: (props: Record<string, unknown>) => {
    authProviderSpy(props);
    return <div data-testid="auth-ui">{props.children as React.ReactNode}</div>;
  },
}));

describe("Providers", () => {
  afterEach(() => {
    authProviderSpy.mockClear();
    mockRouter.refresh.mockClear();
  });

  it("renders AuthUIProvider with oneTap disabled when env is missing", async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const { Providers } = await import("@/app/providers");

    render(
      <Providers>
        <div>Child</div>
      </Providers>,
    );

    const props = authProviderSpy.mock.calls[0][0];
    expect(props).toMatchObject({
      authClient: mockAuthClient,
      oneTap: false,
    });

    (props.onSessionChange as () => void)();
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it("enables oneTap when env is set", async () => {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "client-id";
    jest.resetModules();

    const { Providers } = await import("@/app/providers");

    render(
      <Providers>
        <div>Child</div>
      </Providers>,
    );

    const props = authProviderSpy.mock.calls[0][0];
    expect(props).toMatchObject({ oneTap: true });
  });
});
