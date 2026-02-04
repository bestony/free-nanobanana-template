const createAuthClient = jest.fn();
const oneTapClient = jest.fn();

jest.mock("better-auth/react", () => ({
  createAuthClient: (...args: unknown[]) => createAuthClient(...args),
}));

jest.mock("better-auth/client/plugins", () => ({
  oneTapClient: (...args: unknown[]) => oneTapClient(...args),
}));

describe("lib/auth-client", () => {
  beforeEach(() => {
    createAuthClient.mockReset();
    oneTapClient.mockReset();
    delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  });

  it("creates client without one-tap when env is missing", async () => {
    const client = {
      signIn: "signIn",
      signUp: "signUp",
      useSession: "useSession",
    };
    createAuthClient.mockReturnValue(client);

    jest.resetModules();
    const mod = await import("@/lib/auth-client");

    expect(createAuthClient).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000",
      plugins: [],
    });
    expect(mod.authClient).toBe(client);
    expect(mod.signIn).toBe("signIn");
    expect(mod.signUp).toBe("signUp");
    expect(mod.useSession).toBe("useSession");
  });

  it("adds one-tap plugin when env is set", async () => {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "client-id";
    oneTapClient.mockReturnValue("one-tap");
    createAuthClient.mockReturnValue({
      signIn: "signIn",
      signUp: "signUp",
      useSession: "useSession",
    });

    jest.resetModules();
    await import("@/lib/auth-client");

    expect(oneTapClient).toHaveBeenCalledWith({ clientId: "client-id" });
    expect(createAuthClient).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000",
      plugins: ["one-tap"],
    });
  });
});
