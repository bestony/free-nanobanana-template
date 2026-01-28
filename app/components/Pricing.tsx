export default function Pricing() {
  return (
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
  );
}
