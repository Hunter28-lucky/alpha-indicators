import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Check,
  ShieldCheck,
  ArrowLeft,
  Smartphone,
  ScanLine,
  Clock,
  AlertCircle
} from "lucide-react";
import qrCodeImage from "@/assets/upi-qr.png";

export const Route = createFileRoute("/checkout/$id")({
  component: CheckoutPage,
});

const INDICATORS: Record<string, { name: string; price: number; features: string[]; desc: string }> = {
  "liquidity": {
    name: "Liquidity Zones Pro",
    desc: "Maps institutional liquidity pools, sweep zones and order blocks in real time.",
    price: 1000,
    features: ["Real-time liquidity mapping", "Order block detection", "Multi-timeframe analysis", "Custom alerts"],
  },
  "smart-money": {
    name: "Smart Money Engine",
    desc: "ICT-based logic detecting market structure shifts, BOS and CHoCH.",
    price: 1000,
    features: ["Market structure shifts", "BOS & CHoCH detection", "Confluence filters", "Premium support"],
  },
  "mean-reversion": {
    name: "FVG Precision",
    desc: "Highlights fair value gaps and imbalance zones with statistical retracement probability scoring.",
    price: 1000,
    features: ["Dynamic bands", "Reversal signals", "Volatility adjustment", "Backtested settings"],
  },
  "volume-footprint": {
    name: "Volume Footprint",
    desc: "Volume profile + delta footprint surfaces real participation behind every move on intraday charts.",
    price: 1000,
    features: ["Volume profile", "Delta footprint", "Real-time order flow", "Intraday accuracy"],
  },
};

function CheckoutPage() {
  const { id } = Route.useParams();
  const indicator = INDICATORS[id] || INDICATORS["liquidity"];

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isMobile, setIsMobile] = useState(false);
  const upiLink = "upi://pay?pa=8797903378@naviaxis&pn=Krish&am=1000&cu=INR";

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());

    // Timer logic
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMobilePay = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1 flex justify-center py-12 md:py-20 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Section */}
          <div>
            <Link to="/#indicators" className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground mb-8 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Indicators</span>
            </Link>
            
            <h1 className="text-3xl font-display font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground mb-8">Scan the QR code or use a UPI app to get instant access.</p>
            
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-8 backdrop-blur-md shadow-xl">
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-gold/20 blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Timer */}
                <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-black/40 border border-white/5">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="font-mono text-lg font-bold text-white tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {timeLeft === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 border border-loss/20 bg-loss/5 rounded-xl w-full">
                    <AlertCircle className="w-8 h-8 text-loss mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">Payment Session Expired</h3>
                    <p className="text-sm text-muted-foreground">Please refresh the page to generate a new QR code.</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                      Refresh Page
                    </button>
                  </div>
                ) : (
                  <>
                    {isMobile ? (
                      <div className="flex flex-col w-full gap-4">
                        <button
                          onClick={handleMobilePay}
                          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gold hover:bg-gold/90 text-background font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_-5px_oklch(0.82_0.14_85/0.5)]"
                        >
                          <Smartphone className="w-6 h-6" />
                          Pay with UPI App
                        </button>
                        <p className="text-center text-xs text-muted-foreground mt-2">
                          Tap to open GPay, PhonePe, Paytm, or any UPI app
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-inner shadow-black/20">
                        <div className="relative flex items-center justify-center w-64 h-64 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-white">
                          <img 
                            src={qrCodeImage} 
                            alt="UPI QR Code" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 ring-4 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-slate-600">
                          <ScanLine className="w-4 h-4" />
                          <span className="text-sm font-medium">Scan with any UPI App</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 text-center w-full">
                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Secure UPI Payment via Naviaxis
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-2">
                        After payment, your access will be activated instantly.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-surface/40 p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-xl font-display font-bold text-white mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-start pb-6 border-b border-white/5">
                <div>
                  <h3 className="font-bold text-white">{indicator.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Lifetime access</p>
                </div>
                <span className="font-bold text-lg text-white">₹1000</span>
              </div>

              <div className="py-6 border-b border-white/5 space-y-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What's included</h4>
                <ul className="space-y-3">
                  {indicator.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-profit mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="text-3xl font-display font-bold text-white">₹1000</span>
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
