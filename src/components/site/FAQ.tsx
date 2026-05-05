import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Do these indicators guarantee profit?",
    a: "No. Trading involves substantial risk and no tool can guarantee profitable outcomes. Our indicators are analytical aids designed to improve decision quality, but results depend on your discipline, risk management and market conditions.",
  },
  {
    q: "Which markets and platforms do they work on?",
    a: "Indicators are available for TradingView, MetaTrader 5 and NinjaTrader. They work across equities (NSE/NYSE), index futures (Nifty, BankNifty, ES, NQ), forex majors and crypto pairs.",
  },
  {
    q: "Are these suitable for beginners?",
    a: "They are accessible to beginners but assume basic understanding of price action and risk management. We provide onboarding videos and a structured guide to help you build foundational skills first.",
  },
  {
    q: "How are payments handled in India?",
    a: "We accept UPI, all major Indian credit/debit cards, net banking and international cards. Pricing is inclusive of GST. You will receive a tax invoice immediately after payment.",
  },
  {
    q: "What's the refund policy?",
    a: "We offer a 7-day money-back guarantee on all plans. If the toolkit isn't right for you, contact support within 7 days for a full refund — no questions asked.",
  },
  {
    q: "Will I get future indicator updates?",
    a: "Pro and Elite users receive all updates and new indicator releases for the duration of their subscription. Elite users receive lifetime updates on currently shipped indicators.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · FAQ
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Frequently asked questions.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-surface">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-surface-elevated"
                >
                  <span className="text-sm font-medium sm:text-base">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 flex-shrink-0 text-gold" />
                  ) : (
                    <Plus className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
