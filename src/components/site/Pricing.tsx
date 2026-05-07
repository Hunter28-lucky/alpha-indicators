import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Basic",
    price: "₹1,499",
    period: "/ month",
    desc: "Start trading with essential signals.",
    features: [
      "2 core indicators",
      "Daily market signals",
      "Email alerts",
      "Community access",
    ],
    cta: "Buy Now",
    highlight: false,
    plan: "basic",
  },
  {
    name: "Pro",
    price: "₹3,999",
    period: "/ month",
    desc: "Most popular for active traders.",
    features: [
      "All 6 indicators",
      "Multi-timeframe analysis",
      "Real-time push alerts",
      "Weekly strategy session",
      "Risk calculator",
    ],
    cta: "Buy Pro",
    highlight: true,
    plan: "pro",
  },
  {
    name: "Elite",
    price: "₹9,999",
    period: "/ month",
    desc: "For full-time traders & teams.",
    features: [
      "Everything in Pro",
      "Lifetime indicator updates",
      "Private mentor desk",
      "API & webhook access",
      "Custom strategy build",
      "Priority support",
    ],
    cta: "Buy Elite",
    highlight: false,
    plan: "elite",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · Pricing
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Choose the desk that fits your edge.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            All plans include a 7-day money-back guarantee. Cancel anytime. INR pricing
            inclusive of GST.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-xl border p-7 ${
                t.highlight
                  ? "border-gold/60 bg-gradient-to-b from-gold/[0.06] to-surface shadow-[0_0_60px_-20px_oklch(0.82_0.14_85/0.5)]"
                  : "border-border/60 bg-surface"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-gold to-gold/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-profit" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/indicators"
                className={`mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  t.highlight
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-[0_0_20px_-6px_oklch(0.82_0.14_85/0.6)]"
                    : "border border-border bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl border border-border/60 bg-gradient-to-r from-surface to-surface/50 p-8 md:flex-row lg:p-10">
          <div>
            <h3 className="text-xl font-semibold">Need a Custom Strategy?</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Have a unique edge or specific trading logic? We can build a custom TradingView indicator or screener tailored exactly to your requirements, complete with alerts and backtesting capabilities.
            </p>
          </div>
          <Link
            to="/custom-indicator"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-md border border-border/60 bg-surface px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:bg-muted"
          >
            Get a Custom Indicator
          </Link>
        </div>
      </div>
    </section>
  );
}
