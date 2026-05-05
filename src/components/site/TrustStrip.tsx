export function TrustStrip() {
  const items = [
    "Used by 10,000+ traders globally",
    "Backtested across 12+ years of data",
    "Institutional logic, retail accessible",
    "Audited monthly performance reports",
  ];
  return (
    <section className="border-b border-border/60 bg-background py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-4 text-center text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 lg:text-sm">
          {items.map((t) => (
            <div key={t} className="flex items-center justify-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
