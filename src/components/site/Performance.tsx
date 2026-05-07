import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const STATS = [
  { label: "Win Rate", value: "68.4%", sub: "Across 12,408 closed trades", tone: "profit" },
  { label: "Avg. Risk : Reward", value: "1 : 2.6", sub: "Trailing 12 months", tone: "" },
  { label: "Monthly Return", value: "+8.2%", sub: "Median · simulated", tone: "profit" },
  { label: "Max Drawdown", value: "-9.1%", sub: "Conservative profile", tone: "loss" },
];

const MONTHS = [
  { m: "Jan", v: 4.2 }, { m: "Feb", v: 6.1 }, { m: "Mar", v: -1.8 },
  { m: "Apr", v: 7.4 }, { m: "May", v: 9.2 }, { m: "Jun", v: 3.1 },
  { m: "Jul", v: 11.4 }, { m: "Aug", v: -2.6 }, { m: "Sep", v: 8.0 },
  { m: "Oct", v: 5.3 }, { m: "Nov", v: 12.1 }, { m: "Dec", v: 6.8 },
];

const EQUITY_DATA = [
  { month: "M1", value: 10000 }, { month: "M2", value: 10420 }, { month: "M3", value: 11056 },
  { month: "M4", value: 10857 }, { month: "M5", value: 11660 }, { month: "M6", value: 12732 },
  { month: "M7", value: 13127 }, { month: "M8", value: 14623 }, { month: "M9", value: 14243 },
  { month: "M10", value: 15382 }, { month: "M11", value: 16198 }, { month: "M12", value: 18158 },
  { month: "M13", value: 19391 }, { month: "M14", value: 18984 }, { month: "M15", value: 20692 },
  { month: "M16", value: 21914 }, { month: "M17", value: 23141 }, { month: "M18", value: 22655 },
  { month: "M19", value: 25238 }, { month: "M20", value: 24582 }, { month: "M21", value: 26549 },
  { month: "M22", value: 27956 }, { month: "M23", value: 31338 }, { month: "M24", value: 33467 },
];

export function Performance() {
  const max = Math.max(...MONTHS.map((m) => Math.abs(m.v)));
  return (
    <section id="performance" className="border-b border-border/60 bg-surface/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · Live Performance
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Transparent metrics. Verified statistics.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Aggregate performance across our public model portfolio. Reported monthly,
            audit-ready and benchmarked against passive indices.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div
                className={`mt-3 font-mono text-2xl font-semibold sm:text-3xl ${
                  s.tone === "profit" ? "text-profit" : s.tone === "loss" ? "text-loss" : "text-foreground"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-surface p-6 lg:col-span-3 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold">Equity Curve · 24 Months</h3>
              <span className="font-mono text-xs text-profit">+234.6%</span>
            </div>
            <div className="flex-1 w-full min-h-[220px] rounded-md">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EQUITY_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.16 160)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.7 0.16 160)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.5 0 0 / 0.2)" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'oklch(0.6 0 0)', fontSize: 10 }}
                    minTickGap={20}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'oklch(0.6 0 0)', fontSize: 10 }}
                    tickFormatter={(value) => `$${(value/1000)}k`}
                    width={45}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'oklch(0.2 0 0)', borderColor: 'oklch(0.3 0 0)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: 'oklch(0.7 0.16 160)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.7 0.16 160)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface p-6 lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-semibold">Monthly Returns · 2024</h3>
              <span className="font-mono text-xs text-muted-foreground">YTD +69.2%</span>
            </div>
            <div className="flex-1 flex items-end gap-2 min-h-[220px]">
              {MONTHS.map((m) => {
                const h = (Math.abs(m.v) / max) * 100;
                const positive = m.v >= 0;
                return (
                  <div key={m.m} className="flex flex-col h-full items-center justify-end gap-3 flex-1">
                    <div className="relative flex-1 w-full flex items-end justify-center">
                      <div
                        className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 hover:opacity-80 ${positive ? "bg-profit" : "bg-loss"}`}
                        style={{ height: `${h}%` }}
                        title={`${m.m}: ${m.v}%`}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">{m.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          * Simulated and forward-tested results. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
