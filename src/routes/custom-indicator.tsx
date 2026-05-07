import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/custom-indicator")({
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
