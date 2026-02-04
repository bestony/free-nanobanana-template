const ORIGINAL_ENV = process.env;

const createAuthClientMock = jest.fn(() => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  useSession: jest.fn(),
}));

const oneTapClientMock = jest.fn(() => "one-tap-plugin");

jest.mock("better-auth/react", () => ({
  createAuthClient: (...args: unknown[]) => createAuthClientMock(...args),
}));

jest.mock("better-auth/client/plugins", () => ({
  oneTapClient: (...args: unknown[]) => oneTapClientMock(...args),
}));

describe("auth-client", () => {
  beforeEach(() => {
    jest.resetModules();
    createAuthClientMock.mockClear();
    oneTapClientMock.mockClear();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("creates a client without one-tap when no public client id", async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    await import("@/lib/auth-client");

    expect(createAuthClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "http://localhost:3000",
        plugins: [],
      }),
    );
    expect(oneTapClientMock).not.toHaveBeenCalled();
  });

  it("adds the one-tap plugin when a public client id is set", async () => {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "google-client-id";

    const authClientModule = await import("@/lib/auth-client");
    const authClient = createAuthClientMock.mock.results[0]?.value;

    expect(oneTapClientMock).toHaveBeenCalledWith({
      clientId: "google-client-id",
    });
    expect(createAuthClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        plugins: ["one-tap-plugin"],
      }),
    );
    expect(authClientModule.authClient).toBe(authClient);
    expect(authClientModule.signIn).toBe(authClient.signIn);
    expect(authClientModule.signUp).toBe(authClient.signUp);
    expect(authClientModule.useSession).toBe(authClient.useSession);
  });
});
