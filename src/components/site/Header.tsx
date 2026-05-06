import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Indicators", href: "/#indicators" },
    { label: "Performance", href: "/#performance" },
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold/70 text-gold-foreground">
            <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Veridian<span className="text-gold">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/indicators"
            className="rounded-md bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-6px_oklch(0.82_0.14_85/0.6)] transition-transform hover:-translate-y-0.5"
          >
            Get Access
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-md p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col gap-1 px-5 py-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/indicators"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-3 text-center text-sm font-medium text-white"
            >
              Get Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
