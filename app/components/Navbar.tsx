import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    {
      href: "/auth/magic-link",
      label: "Magic link",
      title: "Email login without a password",
    },
    {
      href: "/auth/forgot-password",
      label: "Forgot password",
      title: "Trigger email to reset forgotten password",
    },
    {
      href: "/auth/two-factor",
      label: "Two-factor",
      title: "Two-factor authentication",
    },
    {
      href: "/auth/recover-account",
      label: "Recover account",
      title: "Recover account via backup code",
    },
    {
      href: "/auth/reset-password",
      label: "Reset password",
      title: "Set new password after receiving reset link",
    },
    {
      href: "/auth/sign-out",
      label: "Sign out",
      title: "Log the user out of the application",
    },
    {
      href: "/auth/callback",
      label: "Auth callback",
      title: "Internal route to handle Auth callbacks",
    },
    {
      href: "/auth/accept-invitation",
      label: "Accept invitation",
      title: "Accept an invitation to an organization",
    },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a className="group flex items-center gap-2" href="#">
          <span className="text-2xl group-hover:animate-bounce">🍌</span>
          <span className="text-xl font-bold tracking-tight">Nanobanana</span>
        </a>
        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-sm font-medium text-nano-gray transition-colors hover:text-black"
              href={link.href}
              title={link.title}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
