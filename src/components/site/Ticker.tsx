const TICKERS = [
  { s: "NIFTY 50", p: "24,712.30", c: "+0.84%", up: true },
  { s: "BANKNIFTY", p: "52,408.15", c: "+1.12%", up: true },
  { s: "BTC/USD", p: "97,420.50", c: "-0.42%", up: false },
  { s: "EUR/USD", p: "1.0824", c: "+0.18%", up: true },
  { s: "GOLD", p: "2,684.10", c: "+0.61%", up: true },
  { s: "SPX500", p: "5,872.40", c: "-0.23%", up: false },
  { s: "ETH/USD", p: "3,412.20", c: "+2.04%", up: true },
  { s: "CRUDE", p: "78.32", c: "-1.05%", up: false },
  { s: "RELIANCE", p: "1,294.80", c: "+0.51%", up: true },
  { s: "TCS", p: "4,128.65", c: "-0.32%", up: false },
];

export function Ticker() {
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-3">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap font-mono text-xs">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-muted-foreground">{t.s}</span>
            <span className="text-foreground">{t.p}</span>
            <span className={t.up ? "text-profit" : "text-loss"}>{t.c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
