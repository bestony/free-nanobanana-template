const ORIGINAL_ENV = process.env;

const stripeConstructorMock = jest
  .fn()
  .mockImplementation((...args: unknown[]) => ({ client: true, args }));

jest.mock("stripe", () => ({
  __esModule: true,
  default: stripeConstructorMock,
}));

describe("stripe client", () => {
  beforeEach(() => {
    jest.resetModules();
    stripeConstructorMock.mockClear();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("returns null when STRIPE_SECRET_KEY is missing", async () => {
    delete process.env.STRIPE_SECRET_KEY;

    const stripeModule = await import("@/lib/stripe");

    expect(stripeModule.stripe).toBeNull();
    expect(stripeConstructorMock).not.toHaveBeenCalled();
  });

  it("creates a Stripe client when STRIPE_SECRET_KEY is set", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_123";

    const stripeModule = await import("@/lib/stripe");

    expect(stripeConstructorMock).toHaveBeenCalledWith("sk_test_123", {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
    expect(stripeModule.stripe).toEqual({
      client: true,
      args: [
        "sk_test_123",
        {
          apiVersion: "2026-01-28.clover",
          typescript: true,
        },
      ],
    });
  });
});
