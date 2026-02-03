"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/account", label: "Overview" },
  { href: "/account/subscription", label: "Subscription" },
  { href: "/account/generations", label: "Generations" },
  { href: "/account/settings", label: "Account settings" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-3">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/account" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              isActive
                ? "border-nano-yellow bg-nano-yellow/40 text-nano-text"
                : "border-gray-200 text-nano-gray hover:border-gray-300"
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
