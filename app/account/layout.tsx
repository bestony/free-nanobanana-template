import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AccountNav from "@/app/components/AccountNav";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { auth } from "@/lib/auth";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <Navbar />
      <main className="px-6 pb-24 pt-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nano-gray">
              Account Center
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-nano-text md:text-4xl">
                  Manage your Nanobanana workspace
                </h1>
                <p className="text-sm text-nano-gray md:text-base">
                  Update your profile, manage your subscription, and review
                  every generation in one place.
                </p>
              </div>
              <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-nano-gray">
                Signed in as {session.user.email}
              </div>
            </div>
          </div>
          <AccountNav />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
