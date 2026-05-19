import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["720p streaming", "1 device", "Ads supported"],
      current: false,
    },
    {
      name: "Premium",
      price: "$12.99",
      period: "/month",
      features: ["4K HDR", "4 devices", "No ads", "Offline downloads", "Early access"],
      current: true,
    },
    {
      name: "Family",
      price: "$19.99",
      period: "/month",
      features: ["Everything in Premium", "6 devices", "Parental controls", "Multiple profiles"],
      current: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            luminaa2
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/browse" className="hover:text-purple-400 transition">Browse</Link>
            <Link href="/pricing" className="text-purple-400 font-medium">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-400">Start free, upgrade when ready</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900 rounded-2xl p-8 border ${
                plan.current 
                  ? "border-purple-500 scale-105" 
                  : "border-gray-800"
              }`}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-sm px-4 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`mt-8 w-full py-3 rounded-lg font-medium transition ${
                  plan.current
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.current ? "Get Started" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}