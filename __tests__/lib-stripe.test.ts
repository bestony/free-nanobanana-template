const stripeCtor = jest.fn();

jest.mock("stripe", () => ({
  __esModule: true,
  default: function StripeMock(...args: unknown[]) {
    return stripeCtor(...args);
  },
}));

describe("lib/stripe", () => {
  beforeEach(() => {
    stripeCtor.mockReset();
    delete process.env.STRIPE_SECRET_KEY;
  });

  it("exports null when secret key is missing", async () => {
    jest.resetModules();
    const mod = await import("@/lib/stripe");

    expect(mod.stripe).toBeNull();
    expect(stripeCtor).not.toHaveBeenCalled();
  });

  it("creates a Stripe client when key is present", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test";
    stripeCtor.mockReturnValue({ client: true });

    jest.resetModules();
    const mod = await import("@/lib/stripe");

    expect(stripeCtor).toHaveBeenCalledWith("sk_test", {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
    expect(mod.stripe).toEqual({ client: true });
  });
});
