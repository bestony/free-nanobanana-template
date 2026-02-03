"use client";

import Link from "next/link";
import { useState } from "react";

import { authClient, useSession } from "@/lib/auth-client";

export default function NavbarAuth() {
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    await authClient.signOut();
    setIsSigningOut(false);
  };

  if (isPending) {
    return (
      <div className="hidden h-9 w-32 animate-pulse rounded-full bg-gray-100 md:block" />
    );
  }

  if (!session?.user) {
    return (
      <>
        <Link
          className="hidden text-sm font-medium transition-colors hover:text-nano-gray md:block"
          href="/auth/sign-in"
          title="Sign in via email/password and social providers"
        >
          Sign in
        </Link>
        <Link
          className="rounded-full bg-nano-yellow px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all hover:brightness-95"
          href="/auth/sign-up"
          title="New account registration"
        >
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        className="hidden text-sm font-medium transition-colors hover:text-nano-gray md:block"
        href="/account"
        title="Go to your account center"
      >
        Account
      </Link>
      <button
        className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-50"
        onClick={handleSignOut}
        type="button"
      >
        {isSigningOut ? "Signing out..." : "Sign out"}
      </button>
    </>
  );
}
