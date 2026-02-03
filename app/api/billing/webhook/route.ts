import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { getUserIdForStripeCustomer, upsertSubscription } from "@/lib/billing";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature error:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  try {
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const stripeSubscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof stripeSubscription.customer === "string"
          ? stripeSubscription.customer
          : stripeSubscription.customer?.id;

      const userId =
        stripeSubscription.metadata?.userId ||
        (customerId ? await getUserIdForStripeCustomer(customerId) : null);

      if (userId) {
        await upsertSubscription(stripeSubscription, userId);
      }
    }
  } catch (error) {
    console.error("Stripe webhook handling error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
