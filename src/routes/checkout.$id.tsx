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
  AlertCircle,
  Lock
} from "lucide-react";
import qrCodeImage from "@/assets/upi-qr.png";
import ind1 from "@/assets/indicator-1.jpg";
import ind2 from "@/assets/indicator-2.jpg";
import ind3 from "@/assets/indicator-3.jpg";
import ind4 from "@/assets/indicator-4.jpg";

export const Route = createFileRoute("/checkout/$id")({
  component: CheckoutPage,
});

const INDICATORS: Record<string, { name: string; price: number; features: string[]; desc: string; images: string[] }> = {
  "liquidity": {
    name: "Liquidity Zones Pro",
    desc: "Maps institutional liquidity pools, sweep zones and order blocks in real time.",
    price: 1000,
    features: ["Real-time liquidity mapping", "Order block detection", "Multi-timeframe analysis", "Custom alerts"],
    images: [ind1, ind2, ind3]
  },
  "smart-money": {
    name: "Smart Money Engine",
    desc: "ICT-based logic detecting market structure shifts, BOS and CHoCH.",
    price: 1000,
    features: ["Market structure shifts", "BOS & CHoCH detection", "Confluence filters", "Premium support"],
    images: [ind2, ind3, ind4]
  },
  "mean-reversion": {
    name: "FVG Precision",
    desc: "Highlights fair value gaps and imbalance zones with statistical retracement probability scoring.",
    price: 1000,
    features: ["Dynamic bands", "Reversal signals", "Volatility adjustment", "Backtested settings"],
    images: [ind3, ind4, ind1]
  },
  "volume-footprint": {
    name: "Volume Footprint",
    desc: "Volume profile + delta footprint surfaces real participation behind every move on intraday charts.",
    price: 1000,
    features: ["Volume profile", "Delta footprint", "Real-time order flow", "Intraday accuracy"],
    images: [ind4, ind1, ind2]
  },
};

function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 shadow-md border border-slate-200">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Preview ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-5 bg-white shadow-sm" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CheckoutPage() {
  const { id } = Route.useParams();
  const indicator = INDICATORS[id] || INDICATORS["liquidity"];

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isMobile, setIsMobile] = useState(false);
  const upiLink = "upi://pay?pa=8797903378@naviaxis&pn=Krish&am=1000&cu=INR";

  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());

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
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-emerald-200">
      <Header />
      
      <main className="flex-1 flex justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row border border-slate-200">
          
          {/* Left Side: Order Summary & Slider */}
          <div className="w-full lg:w-5/12 bg-slate-50/50 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <Link to="/#indicators" className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{indicator.name}</h2>
            <p className="text-sm font-medium text-emerald-600 mb-6 bg-emerald-50 px-2.5 py-1 rounded-md w-fit">Lifetime Access</p>
            
            <ImageSlider images={indicator.images} />

            <div className="mt-8 flex-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's included</h4>
              <ul className="space-y-3.5">
                {indicator.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-200">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-4xl font-bold text-slate-900">₹1000</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Section */}
          <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-white flex flex-col">
            <div className="flex items-center gap-2 mb-8 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <Lock className="w-4 h-4" />
              <span className="font-bold text-xs tracking-wide uppercase">Secure Checkout</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Payment</h1>
            <p className="text-slate-500 mb-10">Scan the QR code or use your UPI app to get instant access.</p>
            
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
              
              {/* Timer */}
              <div className="flex items-center justify-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 w-fit mx-auto shadow-sm">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-lg font-bold tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {timeLeft === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-6 border border-red-200 bg-red-50 rounded-2xl w-full">
                  <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Session Expired</h3>
                  <p className="text-sm text-slate-600 mb-6">For security reasons, your payment session has timed out.</p>
                  <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-md">
                    Generate New QR Code
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {isMobile ? (
                    <div className="flex flex-col w-full gap-4">
                      <button
                        onClick={handleMobilePay}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_20px_-4px_rgba(5,150,105,0.4)]"
                      >
                        <Smartphone className="w-6 h-6" />
                        Pay with UPI App
                      </button>
                      <p className="text-center text-sm text-slate-500 mt-2 font-medium">
                        Tap to open GPay, PhonePe, Paytm, or any UPI app
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="relative flex items-center justify-center w-64 h-64 p-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <img 
                          src={qrCodeImage} 
                          alt="UPI QR Code" 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-6 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                        <ScanLine className="w-4 h-4" />
                        <span className="text-sm font-semibold">Scan with any UPI App</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-12 text-center w-full pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-600 flex items-center justify-center gap-2 font-medium">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      100% Secure Payment by Naviaxis
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Your access is activated instantly upon successful payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
