import type Stripe from "stripe";

import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";

const createSelectChain = <T>(rows: T[]) => ({
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue(rows),
});

const setupBilling = async (stripeValue?: unknown) => {
  const dbMock = {
    select: jest.fn(),
    insert: jest.fn(),
  };

  const stripeMock =
    typeof stripeValue === "undefined"
      ? ({
          customers: {
            create: jest.fn(),
          },
        } as const)
      : stripeValue;

  jest.resetModules();
  jest.doMock("@/db", () => ({ __esModule: true, default: dbMock }));
  jest.doMock("@/lib/stripe", () => ({ stripe: stripeMock }));

  const billing = await import("@/lib/billing");

  return { billing, dbMock, stripeMock };
};

describe("billing utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("exposes the PRO price id from env", async () => {
    const original = process.env.STRIPE_PRICE_ID_PRO;
    process.env.STRIPE_PRICE_ID_PRO = "price_pro";

    const { billing } = await setupBilling();

    expect(billing.PRO_PRICE_ID).toBe("price_pro");

    if (typeof original === "undefined") {
      delete process.env.STRIPE_PRICE_ID_PRO;
    } else {
      process.env.STRIPE_PRICE_ID_PRO = original;
    }
  });

  it("getSubscriptionByUserId returns the latest subscription", async () => {
    const { billing, dbMock } = await setupBilling();
    const record = { id: "sub_123" };
    const selectChain = createSelectChain([record]);

    dbMock.select.mockReturnValue(selectChain);

    const result = await billing.getSubscriptionByUserId("user_1");

    expect(result).toEqual(record);
    expect(selectChain.orderBy).toHaveBeenCalled();
    expect(selectChain.limit).toHaveBeenCalledWith(1);
  });

  it("getSubscriptionByUserId returns null when missing", async () => {
    const { billing, dbMock } = await setupBilling();
    const selectChain = createSelectChain([]);

    dbMock.select.mockReturnValue(selectChain);

    await expect(billing.getSubscriptionByUserId("user_1")).resolves.toBeNull();
  });

  it("getStripeCustomerIdForUser returns the stripe id", async () => {
    const { billing, dbMock } = await setupBilling();
    const selectChain = createSelectChain([{ stripeCustomerId: "cus_1" }]);

    dbMock.select.mockReturnValue(selectChain);

    await expect(billing.getStripeCustomerIdForUser("user_1")).resolves.toBe(
      "cus_1",
    );
  });

  it("getStripeCustomerIdForUser returns null when missing", async () => {
    const { billing, dbMock } = await setupBilling();
    const selectChain = createSelectChain([]);

    dbMock.select.mockReturnValue(selectChain);

    await expect(
      billing.getStripeCustomerIdForUser("user_1"),
    ).resolves.toBeNull();
  });

  it("getUserIdForStripeCustomer returns the user id", async () => {
    const { billing, dbMock } = await setupBilling();
    const selectChain = createSelectChain([{ userId: "user_9" }]);

    dbMock.select.mockReturnValue(selectChain);

    await expect(billing.getUserIdForStripeCustomer("cus_9")).resolves.toBe(
      "user_9",
    );
  });

  it("getUserIdForStripeCustomer returns null when missing", async () => {
    const { billing, dbMock } = await setupBilling();
    const selectChain = createSelectChain([]);

    dbMock.select.mockReturnValue(selectChain);

    await expect(
      billing.getUserIdForStripeCustomer("cus_9"),
    ).resolves.toBeNull();
  });

  it("getOrCreateStripeCustomerId throws when Stripe is missing", async () => {
    const { billing } = await setupBilling(null);

    await expect(
      billing.getOrCreateStripeCustomerId({ userId: "user_1" }),
    ).rejects.toThrow("Stripe is not configured.");
  });

  it("getOrCreateStripeCustomerId returns existing id", async () => {
    const { billing, dbMock, stripeMock } = await setupBilling();
    const selectChain = createSelectChain([
      { stripeCustomerId: "cus_existing" },
    ]);

    dbMock.select.mockReturnValue(selectChain);

    const result = await billing.getOrCreateStripeCustomerId({
      userId: "user_1",
      email: "hello@example.com",
      name: "Hello",
    });

    expect(result).toBe("cus_existing");
    expect(stripeMock.customers.create).not.toHaveBeenCalled();
    expect(dbMock.insert).not.toHaveBeenCalled();
  });

  it("getOrCreateStripeCustomerId creates and stores a customer", async () => {
    const { billing, dbMock, stripeMock } = await setupBilling();
    const selectChain = createSelectChain([]);
    const insertChain = {
      values: jest.fn().mockResolvedValue(undefined),
    };

    dbMock.select.mockReturnValue(selectChain);
    dbMock.insert.mockReturnValue(insertChain);
    stripeMock.customers.create.mockResolvedValue({ id: "cus_new" });

    const result = await billing.getOrCreateStripeCustomerId({
      userId: "user_1",
      email: "hello@example.com",
      name: "Hello",
    });

    expect(result).toBe("cus_new");
    expect(stripeMock.customers.create).toHaveBeenCalledWith({
      email: "hello@example.com",
      name: "Hello",
      metadata: { userId: "user_1" },
    });
    expect(insertChain.values).toHaveBeenCalledWith({
      userId: "user_1",
      stripeCustomerId: "cus_new",
      updatedAt: expect.any(Date),
    });
  });

  it("getOrCreateStripeCustomerId omits null email and name", async () => {
    const { billing, dbMock, stripeMock } = await setupBilling();
    const selectChain = createSelectChain([]);
    const insertChain = {
      values: jest.fn().mockResolvedValue(undefined),
    };

    dbMock.select.mockReturnValue(selectChain);
    dbMock.insert.mockReturnValue(insertChain);
    stripeMock.customers.create.mockResolvedValue({ id: "cus_nulls" });

    const result = await billing.getOrCreateStripeCustomerId({
      userId: "user_2",
      email: null,
      name: null,
    });

    expect(result).toBe("cus_nulls");
    expect(stripeMock.customers.create).toHaveBeenCalledWith({
      email: undefined,
      name: undefined,
      metadata: { userId: "user_2" },
    });
  });

  it("upsertSubscription returns early when customer id is missing", async () => {
    const { billing, dbMock } = await setupBilling();
    const stripeSubscription = {
      id: "sub_missing",
      customer: null,
      items: { data: [] },
      status: "active",
      cancel_at_period_end: false,
    } as Stripe.Subscription;

    await billing.upsertSubscription(stripeSubscription, "user_1");

    expect(dbMock.insert).not.toHaveBeenCalled();
  });

  it("upsertSubscription inserts subscription details", async () => {
    const { billing, dbMock } = await setupBilling();
    const insertChain = {
      values: jest.fn().mockReturnValue({
        onConflictDoUpdate: jest.fn().mockResolvedValue(undefined),
      }),
    };

    dbMock.insert.mockReturnValue(insertChain);

    const stripeSubscription = {
      id: "sub_active",
      customer: "cus_123",
      items: {
        data: [
          {
            price: { id: "price_123" },
            current_period_end: 1_710_000_000,
          },
        ],
      },
      status: "active",
      cancel_at_period_end: false,
    } as Stripe.Subscription;

    await billing.upsertSubscription(stripeSubscription, "user_1");

    expect(insertChain.values).toHaveBeenCalledWith({
      id: "sub_active",
      userId: "user_1",
      stripeCustomerId: "cus_123",
      priceId: "price_123",
      status: "active",
      currentPeriodEnd: new Date(1_710_000_000 * 1000),
      cancelAtPeriodEnd: false,
      updatedAt: expect.any(Date),
    });
  });

  it("upsertSubscription handles object customers and missing price", async () => {
    const { billing, dbMock } = await setupBilling();
    const onConflictDoUpdate = jest.fn().mockResolvedValue(undefined);
    const insertChain = {
      values: jest.fn().mockReturnValue({ onConflictDoUpdate }),
    };

    dbMock.insert.mockReturnValue(insertChain);

    const stripeSubscription = {
      id: "sub_obj",
      customer: { id: "cus_obj" },
      items: { data: [{}] },
      status: "past_due",
      cancel_at_period_end: true,
    } as Stripe.Subscription;

    await billing.upsertSubscription(stripeSubscription, "user_2");

    const valuesArg = insertChain.values.mock.calls[0]?.[0];
    expect(valuesArg).toEqual(
      expect.objectContaining({
        id: "sub_obj",
        userId: "user_2",
        stripeCustomerId: "cus_obj",
        priceId: "unknown-price",
        status: "past_due",
        currentPeriodEnd: null,
        cancelAtPeriodEnd: true,
      }),
    );
    expect(onConflictDoUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object) as AnySQLiteColumn,
        set: expect.objectContaining({
          priceId: "unknown-price",
          status: "past_due",
          currentPeriodEnd: null,
          cancelAtPeriodEnd: true,
          updatedAt: expect.any(Date),
        }),
      }),
    );
  });
});
