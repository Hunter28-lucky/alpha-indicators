import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Ticker } from "@/components/site/Ticker";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Indicators } from "@/components/site/Indicators";
import { Performance } from "@/components/site/Performance";
import { HowItWorks } from "@/components/site/HowItWorks";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veridian — Institutional-Grade Trading Indicators" },
      {
        name: "description",
        content:
          "Premium trading indicators built with institutional logic. Liquidity zones, smart money signals, FVG and volume profile — engineered for disciplined traders.",
      },
      { property: "og:title", content: "Veridian — Institutional-Grade Trading Indicators" },
      {
        property: "og:description",
        content:
          "Built with precision. Designed for consistency. Trusted by disciplined traders worldwide.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Ticker />
      <main>
        <Hero />
        <TrustStrip />
        <Indicators />
        <Performance />
        <HowItWorks />
        <DashboardPreview />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
