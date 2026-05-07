import { useEffect, useState } from "react";

const INITIAL_TICKERS = [
  { s: "NIFTY 50", sym: "^NSEI", p: "...", c: "...", up: true },
  { s: "BANKNIFTY", sym: "^NSEBANK", p: "...", c: "...", up: true },
  { s: "BTC/USD", sym: "BTC-USD", p: "...", c: "...", up: true },
  { s: "EUR/USD", sym: "EURUSD=X", p: "...", c: "...", up: true },
  { s: "GOLD", sym: "GC=F", p: "...", c: "...", up: true },
  { s: "SPX500", sym: "^GSPC", p: "...", c: "...", up: true },
  { s: "ETH/USD", sym: "ETH-USD", p: "...", c: "...", up: true },
  { s: "CRUDE", sym: "CL=F", p: "...", c: "...", up: true },
  { s: "RELIANCE", sym: "RELIANCE.NS", p: "...", c: "...", up: true },
  { s: "TCS", sym: "TCS.NS", p: "...", c: "...", up: true },
];

export function Ticker() {
  const [tickers, setTickers] = useState(INITIAL_TICKERS);

  useEffect(() => {
    let mounted = true;

    async function fetchLivePrices() {
      if (!mounted) return;
      
      const updated = await Promise.all(
        INITIAL_TICKERS.map(async (ticker) => {
          try {
            // Using a CORS proxy to fetch directly from Yahoo Finance in the browser
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker.sym}?interval=1m`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            
            const res = await fetch(proxyUrl);
            const data = await res.json();
            const yfData = JSON.parse(data.contents);
            
            const meta = yfData.chart.result[0].meta;
            const price = meta.regularMarketPrice;
            const prevClose = meta.previousClose;
            const changeRaw = price - prevClose;
            const changePct = (changeRaw / prevClose) * 100;
            const isUp = changeRaw >= 0;
            
            return {
              ...ticker,
              p: price < 10 ? price.toFixed(4) : price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              c: `${isUp ? "+" : ""}${changePct.toFixed(2)}%`,
              up: isUp
            };
          } catch (error) {
            console.error(`Failed to fetch ${ticker.sym}:`, error);
            // Fallback to what we have if fetch fails
            return ticker;
          }
        })
      );

      if (mounted) {
        setTickers(updated);
      }
    }

    fetchLivePrices();

    // Poll every 60 seconds for live updates
    const interval = setInterval(fetchLivePrices, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const items = [...tickers, ...tickers, ...tickers, ...tickers]; // Quadruple to ensure smooth infinite scrolling
  
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-3 flex">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap font-mono text-xs hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <div key={`${t.sym}-${i}`} className="flex items-center gap-3">
            <span className="text-muted-foreground">{t.s}</span>
            <span className="text-foreground font-semibold">{t.p}</span>
            <span className={t.p === "..." ? "text-muted-foreground" : (t.up ? "text-profit" : "text-loss")}>
              {t.c}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
