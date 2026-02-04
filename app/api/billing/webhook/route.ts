import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { getUserIdForStripeCustomer, upsertSubscription } from "@/lib/billing";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const jsonError = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const subscriptionEventTypes = new Set<string>([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const isSubscriptionEvent = (event: Stripe.Event) =>
  subscriptionEventTypes.has(event.type);

const getCustomerId = (stripeSubscription: Stripe.Subscription) =>
  typeof stripeSubscription.customer === "string"
    ? stripeSubscription.customer
    : stripeSubscription.customer?.id;

const resolveUserId = async (stripeSubscription: Stripe.Subscription) => {
  const customerId = getCustomerId(stripeSubscription);
  return (
    stripeSubscription.metadata?.userId ||
    (customerId ? await getUserIdForStripeCustomer(customerId) : null)
  );
};

const handleEvent = async (event: Stripe.Event) => {
  if (!isSubscriptionEvent(event)) return;

  const stripeSubscription = event.data.object as Stripe.Subscription;
  const userId = await resolveUserId(stripeSubscription);

  if (userId) {
    await upsertSubscription(stripeSubscription, userId);
  }
};

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return jsonError("Stripe is not configured.", 503);
  }

  if (!signature) {
    return jsonError("Stripe signature is missing.", 400);
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature error:", error);
    return jsonError("Invalid webhook signature.", 400);
  }

  try {
    await handleEvent(event);
  } catch (error) {
    console.error("Stripe webhook handling error:", error);
    return jsonError("Webhook handler failed.", 500);
  }

  return NextResponse.json({ received: true });
}
