const TESTIMONIALS = [
  {
    quote:
      "What I appreciate is the discipline these tools force. The structured stop and target levels removed half my emotional trades within a month.",
    name: "Arjun Mehta",
    role: "Full-time futures trader · Mumbai",
  },
  {
    quote:
      "Veridian's smart money engine aligns with how desks actually price liquidity. It's not a magic signal — it's a serious analytical layer.",
    name: "Priya Raghavan",
    role: "Quant analyst · Bengaluru",
  },
  {
    quote:
      "I trade swing setups on Nifty and BankNifty. The multi-timeframe confluence on this toolkit cleaned up my entries significantly.",
    name: "Rohan Kapoor",
    role: "Independent trader · Delhi",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border/60 bg-surface/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · Voices from the desk
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Built by traders. Trusted by professionals.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-border/60 bg-surface p-7"
            >
              <div className="text-3xl leading-none text-gold/70">"</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
