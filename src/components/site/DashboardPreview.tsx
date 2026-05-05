import { ArrowUpRight, Bell, TrendingUp } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="border-b border-border/60 bg-surface/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              · Dashboard
            </span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
              A trading panel built like a desk terminal.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Trend bias, signal status, stop-loss, and structured target ladder — surfaced
              in a single, glanceable panel. Designed to keep you decisive in fast markets.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Real-time trend regime detection (HTF + LTF)",
                "Entry, invalidation and target ladder calculated automatically",
                "Push & email alerts with risk-sized position suggestion",
                "Audit log of every signal — no rewrites, no hindsight",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1.5 h-1 w-4 flex-shrink-0 rounded bg-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock panel */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-gold/10 blur-3xl" />
            <div className="overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-border/60 bg-surface px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-loss/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-profit/80" />
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  BTCUSDT · 15m · Veridian Engine v3.2
                </div>
                <Bell className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-2 gap-px bg-border/60">
                <Cell label="Trend (HTF)" value={
                  <span className="flex items-center gap-1.5 text-profit">
                    <TrendingUp className="h-4 w-4" /> Uptrend
                  </span>
                } />
                <Cell label="Trend (LTF)" value={
                  <span className="flex items-center gap-1.5 text-profit">
                    <TrendingUp className="h-4 w-4" /> Bullish continuation
                  </span>
                } />
                <Cell label="Signal" value={
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-profit/15 px-2 py-1 font-mono text-xs text-profit">
                    LONG · Confirmed
                  </span>
                } />
                <Cell label="Confidence" value={
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[78%] bg-gradient-to-r from-gold to-profit" />
                    </div>
                    <span className="font-mono text-xs">78%</span>
                  </div>
                } />
              </div>

              <div className="space-y-3 bg-background p-5">
                <Row label="Entry" value="97,420.50" tone="" />
                <Row label="Stop loss" value="96,840.00" tone="loss" sub="-0.59% · risk 1R" />
                <Row label="Target 1" value="98,260.00" tone="profit" sub="+0.86% · 1.5R" />
                <Row label="Target 2" value="99,140.00" tone="profit" sub="+1.76% · 3.0R" />
                <Row label="Target 3" value="100,420.00" tone="gold" sub="+3.08% · 5.2R" />
              </div>

              <div className="flex items-center justify-between border-t border-border/60 bg-surface px-5 py-3 text-xs">
                <span className="font-mono text-muted-foreground">Updated 12s ago</span>
                <span className="inline-flex items-center gap-1 text-gold">
                  Open in chart <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-surface/80 px-5 py-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm">{value}</div>
    </div>
  );
}

function Row({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone: "profit" | "loss" | "gold" | "" }) {
  const c = tone === "profit" ? "text-profit" : tone === "loss" ? "text-loss" : tone === "gold" ? "text-gold" : "text-foreground";
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        {sub && <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{sub}</div>}
      </div>
      <div className={`font-mono text-sm ${c}`}>{value}</div>
    </div>
  );
}

