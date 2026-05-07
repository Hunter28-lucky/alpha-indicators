import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 text-left">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold/70 text-gold-foreground">
                <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-semibold">
                Veridian<span className="text-gold">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground text-left">
              Institutional-grade trading indicators engineered for disciplined,
              data-driven traders across equities, derivatives, FX and crypto.
            </p>
            <div className="mt-6 rounded-md border border-border/60 bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Risk Disclaimer:</span>{" "}
              Trading in financial markets involves substantial risk of loss and is not
              suitable for every investor. Past performance does not guarantee future
              results. Veridian provides analytical tools only and not investment advice.
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="/#indicators" className="hover:text-foreground">Indicators</a></li>
              <li><Link to="/custom-indicator" className="hover:text-foreground">Custom Strategy</Link></li>
              <li><a href="/#performance" className="hover:text-foreground">Performance</a></li>
              <li><a href="/#pricing" className="hover:text-foreground">Pricing</a></li>
              <li><Link to="/indicators" className="hover:text-foreground">Get Access</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Veridian Capital Tools. All rights reserved.</span>
          <span className="font-mono">v3.2 • Last update: market close</span>
        </div>
      </div>
    </footer>
  );
}
