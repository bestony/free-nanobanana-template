/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-6 pb-32 pt-24 text-center">
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <img
          alt="decoration"
          className="floating-element absolute left-6 top-12 w-24 -rotate-12 opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2VZNWdHZZcr7I39yqrgSuBCMwuHgsAKMGLpL4mBQzgqyHX8im3ZKeuCMs-nNUS8625I95GN2e60X5O3aaUX591kEzLGJ2EaslVD4Fu_gcVWz_3l-q2SEBaF8tPhlIqncofobxBqcdQCY36KH3_b7IWS8XbmNDdEmR6Wi1ZC5GJZ1juvQx3pn23VFhoj5FHaNXYkpbNg-Xk3p2400dVcJm4vol52OVw1yiCJg6_N_6K-4VQAHPPmPheAvPn6Ty9vBlsif4tPkM9Ck"
        />
        <img
          alt="decoration"
          className="floating-element-delayed absolute right-10 top-24 w-24 rotate-45 opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2VZNWdHZZcr7I39yqrgSuBCMwuHgsAKMGLpL4mBQzgqyHX8im3ZKeuCMs-nNUS8625I95GN2e60X5O3aaUX591kEzLGJ2EaslVD4Fu_gcVWz_3l-q2SEBaF8tPhlIqncofobxBqcdQCY36KH3_b7IWS8XbmNDdEmR6Wi1ZC5GJZ1juvQx3pn23VFhoj5FHaNXYkpbNg-Xk3p2400dVcJm4vol52OVw1yiCJg6_N_6K-4VQAHPPmPheAvPn6Ty9vBlsif4tPkM9Ck"
        />
        <img
          alt="decoration"
          className="floating-element absolute bottom-24 left-10 w-20 rotate-12 opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2VZNWdHZZcr7I39yqrgSuBCMwuHgsAKMGLpL4mBQzgqyHX8im3ZKeuCMs-nNUS8625I95GN2e60X5O3aaUX591kEzLGJ2EaslVD4Fu_gcVWz_3l-q2SEBaF8tPhlIqncofobxBqcdQCY36KH3_b7IWS8XbmNDdEmR6Wi1ZC5GJZ1juvQx3pn23VFhoj5FHaNXYkpbNg-Xk3p2400dVcJm4vol52OVw1yiCJg6_N_6K-4VQAHPPmPheAvPn6Ty9vBlsif4tPkM9Ck"
        />
        <img
          alt="decoration"
          className="floating-element-delayed absolute bottom-12 right-12 w-24 -rotate-6 opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2VZNWdHZZcr7I39yqrgSuBCMwuHgsAKMGLpL4mBQzgqyHX8im3ZKeuCMs-nNUS8625I95GN2e60X5O3aaUX591kEzLGJ2EaslVD4Fu_gcVWz_3l-q2SEBaF8tPhlIqncofobxBqcdQCY36KH3_b7IWS8XbmNDdEmR6Wi1ZC5GJZ1juvQx3pn23VFhoj5FHaNXYkpbNg-Xk3p2400dVcJm4vol52OVw1yiCJg6_N_6K-4VQAHPPmPheAvPn6Ty9vBlsif4tPkM9Ck"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Unleash Your Creativity with <br />
          <span className="relative inline-block">
            AI-Powered Nanobanana.
            <span className="absolute bottom-1 left-0 -z-10 h-3 w-full rounded-sm bg-nano-yellow/50" />
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-nano-gray md:text-xl">
          Transform your ideas into stunning visual artworks with our advanced
          AI generation. Simple, fast, and banana-themed.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="w-full rounded-full bg-nano-yellow px-8 py-3.5 text-lg font-semibold text-black shadow-md transition-all hover:brightness-95 sm:w-auto">
            Try for Free
          </button>
          <a
            className="flex items-center gap-2 font-medium text-black transition-all hover:gap-3"
            href="#gallery"
          >
            Explore Gallery
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
