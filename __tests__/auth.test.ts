export {};

const ORIGINAL_ENV = process.env;

const betterAuthMock = jest.fn(() => ({ authClient: true }));
const drizzleAdapterMock = jest.fn(() => "adapter");
const oneTapMock = jest.fn(() => "one-tap");

jest.mock("better-auth", () => ({
  betterAuth: betterAuthMock,
}));

jest.mock("better-auth/adapters/drizzle", () => ({
  drizzleAdapter: drizzleAdapterMock,
}));

jest.mock("better-auth/plugins", () => ({
  oneTap: oneTapMock,
}));

jest.mock("@/db", () => ({ __esModule: true, default: "db" }));

describe("auth config", () => {
  beforeEach(() => {
    jest.resetModules();
    betterAuthMock.mockClear();
    drizzleAdapterMock.mockClear();
    oneTapMock.mockClear();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("builds the better-auth config with drizzle + one-tap", async () => {
    process.env.GOOGLE_CLIENT_ID = "google-id";
    process.env.GOOGLE_CLIENT_SECRET = "google-secret";

    const authModule = await import("@/lib/auth");

    expect(drizzleAdapterMock).toHaveBeenCalledWith("db", {
      provider: "pg",
    });
    expect(betterAuthMock).toHaveBeenCalledWith(
      expect.objectContaining({
        database: "adapter",
        emailAndPassword: { enabled: true },
        socialProviders: {
          google: {
            clientId: "google-id",
            clientSecret: "google-secret",
          },
        },
        plugins: ["one-tap"],
      }),
    );
    expect(authModule.auth).toEqual({ authClient: true });
  });
});
