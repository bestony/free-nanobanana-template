import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getOrCreateStripeCustomerId } from "@/lib/billing";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const customerId = await getOrCreateStripeCustomerId({
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/account/subscription`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return NextResponse.json(
      { error: "Failed to open billing portal." },
      { status: 500 },
    );
  }
}
