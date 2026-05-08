import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/custom-indicator")({
  head: () => ({
    meta: [
      { title: "Best Custom Trading Indicator Development | Veridian" },
      { name: "description", content: "Need the best custom trading indicator for TradingView? We develop bespoke Pine Script indicators tailored to your exact strategy and algorithmic needs." },
      { name: "keywords", content: "custom trading indicator, best custom indicator, tradingview custom script, pine script developer, algorithmic trading indicator development" },
      { property: "og:title", content: "Best Custom Trading Indicator Development | Veridian" },
      { property: "og:description", content: "Need the best custom trading indicator for TradingView? We develop bespoke Pine Script indicators tailored to your exact strategy and algorithmic needs." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Custom Trading Indicator Development",
          "provider": {
            "@type": "Organization",
            "name": "Veridian",
            "url": "https://veridian.com"
          },
          "description": "Professional creation of the best custom trading indicators on TradingView.",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "valieFrom": "2023-01-01"
          }
        }),
      },
    ],
  }),
  component: CustomIndicatorPage,
});

function CustomIndicatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center p-5 py-24 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
          · Custom Solutions
        </span>
        <h1 className="text-4xl font-semibold sm:text-5xl">Your Strategy, Coded.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Got a unique strategy or strict ruleset? Let us build it into a high-performance TradingView indicator, complete with alerts, backtesting, and clean visuals.
        </p>
        
        <div className="mt-12 w-full max-w-lg rounded-2xl border border-border/10 bg-surface/30 p-8 shadow-2xl text-left backdrop-blur-xl">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="name" className="text-foreground/90 font-medium">Your Name</Label>
              <Input 
                id="name"
                type="text" 
                className="bg-background/80" 
                placeholder="John Doe" 
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="email" className="text-foreground/90 font-medium">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                className="bg-background/80" 
                placeholder="john@example.com" 
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="strategy" className="text-foreground/90 font-medium">Strategy Details</Label>
              <Textarea 
                id="strategy"
                rows={5}
                className="bg-background/80 resize-y" 
                placeholder="Describe your entry & exit conditions, indicators used, and any specific calculations required..." 
              />
            </div>
            <Button 
              type="submit"
              size="lg"
              className="mt-2 w-full text-base font-semibold transition-transform active:scale-[0.98]"
            >
              Submit Request
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
