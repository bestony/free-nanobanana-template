import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    {
      href: "/showcase",
      label: "Showcase",
      title: "Curated prompt showcase",
    },
    {
      href: "/gallery",
      label: "Gallery",
      title: "Community gallery",
    },
    {
      href: "/faq",
      label: "FAQ",
      title: "Frequently asked questions",
    },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <a className="group flex items-center gap-2" href="#">
          <span className="text-2xl group-hover:animate-bounce">🍌</span>
          <span className="text-xl font-bold tracking-tight">Nanobanana</span>
        </a>
        <nav className="hidden items-center justify-center gap-6 md:flex">
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
        <div className="flex items-center justify-end gap-4">
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
