export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a className="group flex items-center gap-2" href="#">
          <span className="text-2xl group-hover:animate-bounce">🍌</span>
          <span className="text-xl font-bold tracking-tight">Nanobanana</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            className="text-sm font-medium text-nano-gray transition-colors hover:text-black"
            href="#about"
          >
            About
          </a>
          <a
            className="text-sm font-medium text-nano-gray transition-colors hover:text-black"
            href="#gallery"
          >
            Gallery
          </a>
          <a
            className="text-sm font-medium text-nano-gray transition-colors hover:text-black"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm font-medium text-nano-gray transition-colors hover:text-black"
            href="#pricing"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden text-sm font-medium transition-colors hover:text-nano-gray md:block">
            Sign in
          </button>
          <button className="rounded-full bg-nano-yellow px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all hover:brightness-95">
            Try for Free
          </button>
        </div>
      </div>
    </header>
  );
}
