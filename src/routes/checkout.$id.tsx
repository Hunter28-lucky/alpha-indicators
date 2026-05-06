import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Check,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CreditCard,
  Building2,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/checkout/$id")({
  component: CheckoutPage,
});

const INDICATORS: Record<string, { name: string; price: number; features: string[]; desc: string }> = {
  "liquidity": {
    name: "Liquidity Zones Pro",
    desc: "Maps institutional liquidity pools, sweep zones and order blocks in real time.",
    price: 99,
    features: ["Real-time liquidity mapping", "Order block detection", "Multi-timeframe analysis", "Custom alerts"],
  },
  "smart-money": {
    name: "Smart Money Engine",
    desc: "ICT-based logic detecting market structure shifts, BOS and CHoCH.",
    price: 149,
    features: ["Market structure shifts", "BOS & CHoCH detection", "Confluence filters", "Premium support"],
  },
  "mean-reversion": {
    name: "FVG Precision",
    desc: "Highlights fair value gaps and imbalance zones with statistical retracement probability scoring.",
    price: 79,
    features: ["Dynamic bands", "Reversal signals", "Volatility adjustment", "Backtested settings"],
  },
  "volume-footprint": {
    name: "Volume Footprint",
    desc: "Volume profile + delta footprint surfaces real participation behind every move on intraday charts.",
    price: 129,
    features: ["Volume profile", "Delta footprint", "Real-time order flow", "Intraday accuracy"],
  },
};

function CheckoutPage() {
  const { id } = Route.useParams();
  const indicator = INDICATORS[id] || INDICATORS["liquidity"];

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setInvoiceId(`INV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
        <Header />
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="mb-2 text-3xl font-bold font-heading text-slate-900">Payment Successful</h1>
            <p className="mb-8 text-slate-500">
              Thank you for your purchase. We've sent a receipt to your email address.
            </p>
            <div className="mb-8 rounded-lg bg-slate-50 p-4 text-left border border-slate-100">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Invoice ID</span>
                <span className="font-mono font-medium text-slate-900">{invoiceId}</span>
              </div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Product</span>
                <span className="font-medium text-slate-900">{indicator.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Amount Paid</span>
                <span className="font-bold text-emerald-600">${indicator.price}</span>
              </div>
            </div>
            <Link
              to="/"
              className="block w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="flex-1 flex justify-center py-12 md:py-20 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <Link to="/indicators" className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Indicators</span>
            </Link>
            
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Secure Checkout</h1>
            
            <form onSubmit={handlePayment} className="space-y-8">
              {/* Contact Info */}
              <div className="space-y-4 shadow-sm border border-slate-200 bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                    <input required type="email" placeholder="you@example.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First name</label>
                      <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last name</label>
                      <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-4 shadow-sm border border-slate-200 bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-slate-900">Payment Method</h2>
                
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    <CreditCard className="w-6 h-6 mb-2" />
                    <span className="text-xs font-semibold">Card</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('crypto')} className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${paymentMethod === 'crypto' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="text-xs font-semibold">Crypto</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('bank')} className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${paymentMethod === 'bank' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    <Building2 className="w-6 h-6 mb-2" />
                    <span className="text-xs font-semibold">Bank</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Card number</label>
                      <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expiry date</label>
                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                        <input required type="text" placeholder="123" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center"><Lock className="w-5 h-5 mr-2" /> Pay securely</span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="sticky top-24 shadow-sm border border-slate-200 bg-white p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-start pb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900">{indicator.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Lifetime access</p>
                </div>
                <span className="font-bold text-lg">${indicator.price}</span>
              </div>

              <div className="py-6 border-b border-slate-100 space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">What's included</h4>
                <ul className="space-y-3">
                  {indicator.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 font-medium">Total</span>
                  <span className="text-3xl font-bold text-slate-900">${indicator.price}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
