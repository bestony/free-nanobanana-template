/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <>
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

      <main className="pt-20">
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
              Transform your ideas into stunning visual artworks with our
              advanced AI generation. Simple, fast, and banana-themed.
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

        <section className="px-6 py-24" id="gallery">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-nano-text md:text-4xl">
                Gallery
              </h2>
              <p className="mt-4 text-nano-gray">
                Explore what others have created.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Cyberpunk City"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Fantasy Forest"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Headphones Art"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Mechanical Banana"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhjmKRxmtfGsxFv9ivmNZX7_zUpyMY5WqzEumhVGm3W1AOwxOShnp6VrBofOWylUbW8L1HoUVfXVDXIiCJJPZ0BpZj_O3Gr6vDAkPTlB5_i3FfjpLVbX3-Um2NEiu3sOZF45-0xXKyds2qscEnQFQV3xmxv_UlfylKm8CuPULIUk4DRpdz2CFpt69_I4lbfTzREJdGmrpo94FrSjPMZjxilH2FwIezKcEQ-z3UOauDlPG4sHLeF6h_AXGv1BlBvXGAdoahndj8t9g"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Cyberpunk City"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  alt="Headphones Art"
                  className="gallery-img h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-white/50 px-4 py-2 font-medium text-white backdrop-blur-sm">
                    View Art
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24" id="features">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-nano-text md:text-4xl">
                Core Features
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Speed</h3>
                <p className="text-sm text-nano-gray">
                  High-resolution generation, fast and reliable for all your
                  creative needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.38.328 16.042 16.042 0 0 0 4.788-1.284 6.75 6.75 0 0 0-3.39-12.016A6.749 6.749 0 0 0 4.7 9.873c0 .354.02.705.057 1.054.496.064.982.206 1.436.425ZM4.82 20.211a2.25 2.25 0 0 1-4.144-.753 5.996 5.996 0 0 1 1.944-4.524l-.193-.058a.75.75 0 0 1 .425-1.353l.317.094c.06-.39.148-.773.264-1.146A21.574 21.574 0 0 1 2.76 12.035a.75.75 0 0 1 .305-1.46c.338.07.683.125 1.033.166A6.878 6.878 0 0 1 4.29 9.805a8.273 8.273 0 0 1 2.39-4.606.75.75 0 0 1 1.06 0 8.273 8.273 0 0 1 2.39 4.606c.045.312.076.627.093.945a.75.75 0 0 1-.689.813c-.35.04-.695.096-1.033.166a.75.75 0 0 1-.305-1.46 19.96 19.96 0 0 0-1.067-.282 6.75 6.75 0 0 0-3.39-12.016Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Palette Variety</h3>
                <p className="text-sm text-nano-gray">
                  Premium color presets and variety of instant technological
                  styles.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Brain Models</h3>
                <p className="text-sm text-nano-gray">
                  Generate AI generated art, and access different AI models with
                  ease.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Easy to Access</h3>
                <p className="text-sm text-nano-gray">
                  Access seamless entries to societies and networks from the
                  cloud.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/50 px-6 py-24">
          <div className="mx-auto max-w-6xl space-y-12">
            <h2 className="text-center text-3xl font-bold text-nano-text md:text-4xl">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
                  &ldquo;Nanobanana is creating everything with AI-Power! With
                  our advanced AI-systems and creative comments, service is
                  impeccable.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ai4di01Ldr5ffnYrK-NggiNBf17__gxQdMk7FMWYci-om2agTacyh7yfsHJIwkUFnd4_iduvWxfGV3-n1uEGiBrkurO9T24khf_CkA_Gz3E6XDrIRfSkqUvadMg3nkw0ZocxwfLUwKsXIiX3ivbAYdktEgsgiqru--d1IO7MQ6l1fyRjvecPwpw3Uc3o33vMUtO9GNH91IIJ89Lh-pcfg1-srrTKyFg8rxL8wTzu-MZKkds6A22M7vL_sx9FgGiY7BSjRkH6o8"
                  />
                  <div>
                    <h4 className="text-sm font-bold">Anna Borah</h4>
                    <p className="text-xs text-nano-gray">Diversity Manager</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
                  &ldquo;Nanobanana is satiris complex with AI-Powers! With
                  extraordinary painting in stunning artworks with our advanced
                  AI generation.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE78U8KJbMy_s82mVuoGkEOCKIT_bE8-YIxomB6IOUnJNyJZoW29nVc5VwjxQ8InrIgyepzaprYhK3WTuc3R0MjkklP9nBokYv67cHocM9zHePhFS8XnqL52c42w7xeKXgYtwNoBb0j4IqYmypaFc_JjKpb0hCe2z41-X6fTfpAOT01Cnvg34DOiEmwovSgchUztwq1jOA29RAmFMYzoae2ofAaJlGPUkpE_zVXLnlOrC_nfkmMruuPfPEFt-5MTToyuXSQQbz9i4"
                  />
                  <div>
                    <h4 className="text-sm font-bold">Jennifer Shaner</h4>
                    <p className="text-xs text-nano-gray">CEO</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
                  &ldquo;Creative minds meet ideas! Unique AI generation tools
                  allow me to expand my horizons quickly.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3dU4aOkjS5DfVNzTgxC_D6hq2fAx0Nn_F7j3FWAQvyn--pfyz1pnOQNCMLO-m9_P5KGC4J4eRkzboTBr5ThJ3V7fBJaLm4Yb40jYW_TOVsXc4ydTs4NQ_UugpG3jix93Na-Vla_1ZcAnPXz_LFy2UnT8n8Yq-R7HCfAplBF0JPv2E336BdrR-aFwOibmU7dae-D9dRkjRNRj1dxhFALOFuihVPW7R3nGXHPU6jvH2RKS0k-Waqojeljl4J2aokxin9QCT1OvvbNY"
                  />
                  <div>
                    <h4 className="text-sm font-bold">Mark Otto</h4>
                    <p className="text-xs text-nano-gray">Merch Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24" id="pricing">
          <div className="mx-auto max-w-6xl space-y-12">
            <h2 className="text-center text-3xl font-bold text-nano-text md:text-4xl">
              Pricing
            </h2>
            <div className="flex flex-col items-end justify-center gap-8 md:flex-row">
              <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 text-center transition-shadow hover:shadow-lg md:w-1/3">
                <div className="border-b border-gray-100 bg-gray-50 p-8">
                  <h3 className="text-lg font-bold">Free</h3>
                </div>
                <div className="space-y-6 p-8">
                  <div className="text-3xl font-bold">Free</div>
                  <button className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50">
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="flex w-full -translate-y-0 flex-col overflow-hidden rounded-2xl border border-nano-yellow bg-white p-0 text-center shadow-lg md:w-1/3 md:-translate-y-4">
                <div className="border-b border-nano-yellow bg-nano-yellow p-8">
                  <h3 className="text-lg font-bold text-nano-text">Pro</h3>
                </div>
                <div className="flex flex-1 flex-col justify-between space-y-6 bg-white p-8">
                  <div>
                    <div className="text-3xl font-bold text-nano-text">
                      $10
                      <span className="text-base font-normal text-nano-gray">
                        /plan
                      </span>
                    </div>
                  </div>
                  <button className="w-full rounded-full bg-nano-yellow py-2.5 text-sm font-bold text-black shadow-sm transition-colors hover:brightness-95">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 text-center transition-shadow hover:shadow-lg md:w-1/3">
                <div className="border-b border-gray-100 bg-gray-50 p-8">
                  <h3 className="text-lg font-bold">Business</h3>
                </div>
                <div className="space-y-6 p-8">
                  <div className="text-3xl font-bold">
                    $300
                    <span className="text-base font-normal text-nano-gray">
                      /mo
                    </span>
                  </div>
                  <p className="mt-[-1rem] text-xs text-nano-gray">
                    + Business plan
                  </p>
                  <button className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Nanobanana</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-nano-gray">
            <a className="hover:text-black" href="#about">
              About
            </a>
            <a className="hover:text-black" href="#gallery">
              Gallery
            </a>
            <a className="hover:text-black" href="#features">
              Features
            </a>
            <a className="hover:text-black" href="#pricing">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a className="text-nano-gray hover:text-black" href="#">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
            <a className="text-nano-gray hover:text-black" href="#">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.468 2.3c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-6 text-center text-xs text-nano-gray">
          <p>© 2024 Nanobanana. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
