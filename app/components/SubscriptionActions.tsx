"use client";

import Link from "next/link";
import { useState } from "react";

type SubscriptionActionsProps = {
  isPro: boolean;
};

export default function SubscriptionActions({
  isPro,
}: SubscriptionActionsProps) {
  const [isLoading, setIsLoading] = useState<"checkout" | "portal" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const startFlow = async (flow: "checkout" | "portal") => {
    if (isLoading) return;

    setError(null);
    setIsLoading(flow);

    try {
      const response = await fetch(`/api/billing/${flow}`, {
        method: "POST",
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to open billing.");
      }

      if (payload?.url) {
        window.location.href = payload.url;
        return;
      }

      throw new Error("Billing session missing.");
    } catch (flowError) {
      const message =
        flowError instanceof Error
          ? flowError.message
          : "Unable to open billing.";
      setError(message);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <button
        className="inline-flex w-full items-center justify-center rounded-full bg-nano-yellow px-4 py-2 text-sm font-semibold text-black shadow-sm transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        onClick={() => startFlow(isPro ? "portal" : "checkout")}
        disabled={Boolean(isLoading)}
        type="button"
      >
        {isLoading
          ? "Redirecting..."
          : isPro
            ? "Open billing portal"
            : "Upgrade to Pro"}
      </button>
      <Link
        className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-50"
        href="/pricing"
      >
        Compare plans
      </Link>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
