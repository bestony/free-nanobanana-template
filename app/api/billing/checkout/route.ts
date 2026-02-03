import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getOrCreateStripeCustomerId, PRO_PRICE_ID } from "@/lib/billing";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!PRO_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID_PRO is not set." },
      { status: 500 },
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const customerId = await getOrCreateStripeCustomerId({
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: true,
      client_reference_id: session.user.id,
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
      success_url: `${origin}/account/subscription?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
