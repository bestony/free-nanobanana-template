const tiers = [
  {
    name: "Free",
    price: "Free",
    description: "For trying Nanobanana generation.",
    cta: "Start for free",
    features: ["1 generation per day", "Watermarked outputs"],
  },
  {
    name: "Pro",
    price: "Pro",
    description: "Best for creators generating daily.",
    cta: "Upgrade to Pro",
    badge: "Most popular",
    highlight: true,
    features: ["30 generations per day", "No watermark", "2K & 4K exports"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom plans for teams and studios.",
    cta: "Contact us",
    features: ["Custom daily volume", "Custom terms"],
  },
];

export default function Pricing() {
  return (
    <section className="bg-white px-6 py-24" id="pricing">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nano-gray">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-nano-text md:text-4xl">
            Simple plans for Nanobanana generation
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-nano-gray md:text-base">
            Clear daily limits and watermark rules, so you always know what you
            get.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-shadow hover:shadow-lg ${
                tier.highlight
                  ? "border-nano-yellow shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <div
                className={`border-b p-6 ${
                  tier.highlight
                    ? "border-nano-yellow bg-nano-yellow/40"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-nano-text">
                    {tier.name}
                  </h3>
                  {tier.badge ? (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                      {tier.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-nano-gray">
                  {tier.description}
                </p>
                <div className="mt-6 text-3xl font-bold text-nano-text">
                  {tier.price}
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <ul className="space-y-3 text-sm text-nano-gray">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-nano-yellow" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-nano-yellow text-black shadow-sm hover:brightness-95"
                      : "border border-gray-200 text-black hover:bg-gray-50"
                  }`}
                  type="button"
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
