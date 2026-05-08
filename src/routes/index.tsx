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
      { title: "Veridian | The Most Powerful Trading Indicator Tools" },
      {
        name: "description",
        content:
          "Find your next new indicator. From a powerful trading indicator with institutional logic to building your own custom trading indicator, Veridian has the ultimate tools.",
      },
      { property: "og:title", content: "Veridian | The Most Powerful Trading Indicator Tools" },
      {
        property: "og:description",
        content:
          "Find your next new indicator. From a powerful trading indicator with institutional logic to building your own custom trading indicator, Veridian has the ultimate tools.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Veridian Trading Indicators",
          "operatingSystem": "TradingView",
          "applicationCategory": "FinanceApplication",
          "url": "https://alpha-indicators.vercel.app",
          "description": "Powerful trading indicators, new indicator algorithms, and custom trading indicator development services.",
          "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "category": "subscription"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "153"
          }
        }),
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
