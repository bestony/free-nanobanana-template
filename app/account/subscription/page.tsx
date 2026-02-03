import { format } from "date-fns";
import { headers } from "next/headers";

import SubscriptionActions from "@/app/components/SubscriptionActions";
import { auth } from "@/lib/auth";
import { getSubscriptionByUserId } from "@/lib/billing";

const formatDate = (value?: Date | null) =>
  value ? format(value, "MMM d, yyyy") : "—";

export default async function SubscriptionPage({
  searchParams,
}: {
  searchParams?: { success?: string; canceled?: string };
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return null;
  }

  const subscription = await getSubscriptionByUserId(session.user.id);
  const status = subscription?.status ?? "inactive";
  const isPro = status === "active" || status === "trialing";
  const nextBilling = formatDate(subscription?.currentPeriodEnd);
  const isCanceling = Boolean(subscription?.cancelAtPeriodEnd);

  return (
    <div className="space-y-6">
      {searchParams?.success ? (
        <div className="rounded-2xl border border-nano-yellow bg-nano-yellow/20 p-4 text-sm text-nano-text">
          Subscription active! Your Pro benefits are now unlocked.
        </div>
      ) : null}
      {searchParams?.canceled ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-nano-gray">
          Checkout was canceled. You can restart anytime.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
            Current plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-nano-text">
            {isPro ? "Pro" : "Free"} plan
          </h2>
          <p className="mt-2 text-sm text-nano-gray">Status: {status}</p>
          <p className="mt-2 text-sm text-nano-gray">
            Next billing date: {nextBilling}
          </p>
          {isCanceling ? (
            <p className="mt-2 text-sm text-amber-600">
              Your plan will cancel at the end of the current period.
            </p>
          ) : null}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 text-sm text-nano-gray">
            Pro includes 30 generations per day, no watermark, and higher-res
            exports.
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
            Billing
          </p>
          <h3 className="mt-2 text-xl font-semibold text-nano-text">
            {isPro ? "Manage your subscription" : "Upgrade to Pro"}
          </h3>
          <p className="mt-2 text-sm text-nano-gray">
            Pro is $10 per month. Update payment details, pause, or cancel at
            any time from the billing portal.
          </p>
          <SubscriptionActions isPro={isPro} />
        </div>
      </div>
    </div>
  );
}
