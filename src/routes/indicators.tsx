import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Check, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/indicators")({
  component: IndicatorsPage,
});

const INDICATORS = [
  {
    id: "liquidity",
    name: "Liquidity Zones Pro",
    description: "Maps institutional liquidity pools, sweep zones and order blocks in real time.",
    price: 99,
    rating: 4.9,
    reviews: 128,
    features: ["Real-time liquidity mapping", "Order block detection", "Multi-timeframe analysis", "Custom alerts"],
  },
  {
    id: "smart-money",
    name: "Smart Money Engine",
    description: "ICT-based logic detecting market structure shifts, BOS and CHoCH.",
    price: 149,
    rating: 5.0,
    reviews: 256,
    features: ["Market structure shifts", "BOS & CHoCH detection", "Confluence filters", "Premium support"],
  },
  {
    id: "mean-reversion",
    name: "Mean Reversion Toolkit",
    description: "Identify overextended markets with high-probability reversal zones.",
    price: 79,
    rating: 4.8,
    reviews: 94,
    features: ["Dynamic bands", "Reversal signals", "Volatility adjustment", "Backtested settings"],
  },
];

function IndicatorsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 bg-slate-50 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
              Premium Indicators
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Institutional-grade tools designed for retail traders. Choose the system that fits your trading style.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {INDICATORS.map((indicator) => (
              <div 
                key={indicator.id} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold font-heading text-slate-900">{indicator.name}</h3>
                  </div>
                  
                  <div className="flex items-center mb-4 text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600 font-medium">{indicator.rating} ({indicator.reviews})</span>
                  </div>

                  <p className="text-slate-600 mb-8 min-h-[3rem]">
                    {indicator.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-900">${indicator.price}</span>
                    <span className="text-slate-500">/lifetime</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {indicator.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-slate-700">
                        <Check className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <Link 
                    to={`/checkout/${indicator.id}`}
                    className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-colors"
                  >
                    Buy Now
                  </Link>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Secure Checkout
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
