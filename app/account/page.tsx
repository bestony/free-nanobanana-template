import { AccountView } from "@daveyplate/better-auth-ui";
import { format } from "date-fns";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getSubscriptionByUserId } from "@/lib/billing";

const formatDate = (value?: Date | null) =>
  value ? format(value, "MMM d, yyyy") : "—";

export default async function AccountOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return null;
  }

  const subscription = await getSubscriptionByUserId(session.user.id);
  const isPro =
    subscription?.status === "active" || subscription?.status === "trialing";
  const planLabel = isPro ? "Pro" : "Free";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
              Better Auth
            </p>
            <h2 className="mt-2 text-xl font-semibold text-nano-text">
              Account settings
            </h2>
          </div>
          <Link
            className="text-xs font-semibold text-nano-gray transition-colors hover:text-black"
            href="/account/settings"
          >
            Open full settings →
          </Link>
        </div>
        <div className="mt-6">
          <AccountView view="SETTINGS" hideNav />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
            Subscription
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-nano-text">
            {planLabel} plan
          </h3>
          <p className="mt-2 text-sm text-nano-gray">
            Status: {subscription?.status ?? "inactive"}
          </p>
          <p className="mt-2 text-sm text-nano-gray">
            Next billing date: {formatDate(subscription?.currentPeriodEnd)}
          </p>
          <Link
            className="mt-5 inline-flex items-center rounded-full bg-nano-yellow px-4 py-2 text-sm font-semibold text-black transition-colors hover:brightness-95"
            href="/account/subscription"
          >
            Manage subscription
          </Link>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
            Generations
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-nano-text">
            Your creative history
          </h3>
          <p className="mt-2 text-sm text-nano-gray">
            Review prompts, timestamps, and download outputs whenever you need.
          </p>
          <Link
            className="mt-5 inline-flex items-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-50"
            href="/account/generations"
          >
            Open generation manager
          </Link>
        </div>
      </div>
    </div>
  );
}
