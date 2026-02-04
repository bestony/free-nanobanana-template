import type Stripe from "stripe";
import { desc, eq } from "drizzle-orm";

import db from "@/db";
import { stripeCustomer, subscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";

export const PRO_PRICE_ID = process.env.STRIPE_PRICE_ID_PRO;

export const getSubscriptionByUserId = async (userId: string) => {
  const [record] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .orderBy(desc(subscription.createdAt))
    .limit(1);

  return record ?? null;
};

export const getStripeCustomerIdForUser = async (userId: string) => {
  const [record] = await db
    .select()
    .from(stripeCustomer)
    .where(eq(stripeCustomer.userId, userId))
    .limit(1);

  return record?.stripeCustomerId ?? null;
};

export const getUserIdForStripeCustomer = async (customerId: string) => {
  const [record] = await db
    .select({ userId: stripeCustomer.userId })
    .from(stripeCustomer)
    .where(eq(stripeCustomer.stripeCustomerId, customerId))
    .limit(1);

  return record?.userId ?? null;
};

export const getOrCreateStripeCustomerId = async (options: {
  userId: string;
  email?: string | null;
  name?: string | null;
}) => {
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const existing = await getStripeCustomerIdForUser(options.userId);
  if (existing) return existing;

  const customer = await stripe.customers.create({
    email: options.email ?? undefined,
    name: options.name ?? undefined,
    metadata: {
      userId: options.userId,
    },
  });

  await db.insert(stripeCustomer).values({
    userId: options.userId,
    stripeCustomerId: customer.id,
    updatedAt: new Date(),
  });

  return customer.id;
};

export const upsertSubscription = async (
  stripeSubscription: Stripe.Subscription,
  userId: string,
) => {
  const customerId =
    typeof stripeSubscription.customer === "string"
      ? stripeSubscription.customer
      : stripeSubscription.customer?.id;

  if (!customerId) return;

  const priceId =
    stripeSubscription.items.data[0]?.price?.id ?? "unknown-price";

  const currentPeriodEndTimestamp =
    stripeSubscription.items.data[0]?.current_period_end;
  const currentPeriodEnd = currentPeriodEndTimestamp
    ? new Date(currentPeriodEndTimestamp * 1000)
    : null;

  await db
    .insert(subscription)
    .values({
      id: stripeSubscription.id,
      userId,
      stripeCustomerId: customerId,
      priceId,
      status: stripeSubscription.status,
      currentPeriodEnd,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: subscription.id,
      set: {
        priceId,
        status: stripeSubscription.status,
        currentPeriodEnd,
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        updatedAt: new Date(),
      },
    });
};
