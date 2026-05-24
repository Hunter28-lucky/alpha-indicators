import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/site/Header";
import {
  Check,
  ShieldCheck,
  ArrowLeft,
  Smartphone,
  Lock,
  CheckCircle2,
  Loader2
} from "lucide-react";

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

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<{ order_id: string; amount: number; payment_page_url: string } | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Refs for intervals
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      alert("Please enter your name and email.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("https://gatewayphp-shopifyin05.wasmer.app/api/create_order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: import.meta.env.VITE_PAYMENT_API_KEY,
          amount: indicator.price,
          customer_name: customerName,
          customer_email: customerEmail,
          description: `Order for ${indicator.name}`
        })
      });
      
      const data = await response.json();
      if (data.order_id && data.payment_page_url) {
        setOrderData(data);
        pollStatus(data.order_id);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  const pollStatus = (orderId: string) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`https://gatewayphp-shopifyin05.wasmer.app/api/payment_status.php?order_id=${orderId}`);
        const text = await res.text();
        let currentStatus = "";
        try {
          const json = JSON.parse(text);
          currentStatus = json.status || json.payment_status || text;
        } catch (e) {
          currentStatus = text;
        }
        
        const normalizedStatus = currentStatus.toString().toLowerCase().trim();
        setPaymentStatus(normalizedStatus);

        if (normalizedStatus === "success" || normalizedStatus === "failed" || normalizedStatus === "expired") {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-emerald-200">
      <Header />
      
      <main className="flex-1 flex justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row border border-slate-200">
          
          {/* Left Side: Order Summary & Slider */}
          <div className="w-full lg:w-5/12 bg-slate-50/50 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <Link to="/indicators" className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors w-fit">
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
                <span className="text-4xl font-bold text-slate-900">₹{indicator.price}</span>
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
            <p className="text-slate-500 mb-10">Follow the steps below to get instant access.</p>
            
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
              
              {paymentStatus === "success" ? (
                <div className="flex flex-col items-center justify-center text-center p-8 border border-emerald-200 bg-emerald-50 rounded-2xl w-full">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                  <p className="text-slate-600 mb-8">Your order has been processed successfully. You now have lifetime access.</p>
                  <Link to="/" className="w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]">
                    Return Home
                  </Link>
                </div>
              ) : orderData ? (
                <div className="w-full flex flex-col items-center">
                  <div className="text-center mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Order Created</h3>
                    <p className="text-slate-500">Amount to pay: <span className="font-bold text-slate-900">₹{orderData.amount}</span></p>
                    <p className="text-xs text-slate-400 mt-2">Order ID: {orderData.order_id}</p>
                  </div>
                  
                  <a
                    href={orderData.payment_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-transform hover:scale-[1.02] shadow-lg mb-8"
                  >
                    <Smartphone className="w-6 h-6" />
                    Proceed to Pay
                  </a>

                  <div className="flex flex-col items-center justify-center p-6 border border-slate-200 bg-white rounded-2xl w-full shadow-sm">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
                    <p className="text-slate-900 font-bold">Waiting for payment...</p>
                    <p className="text-sm text-slate-500 mt-1 text-center">Do not close this window. It will automatically update once you pay.</p>
                  </div>
                  
                  {(paymentStatus === "failed" || paymentStatus === "expired") && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl w-full text-center font-medium border border-red-100">
                      Payment {paymentStatus}. Please refresh and try again.
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleCreateOrder} className="w-full flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg transition-transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Lock className="w-6 h-6" />}
                    {loading ? "Generating Payment Link..." : "Pay ₹" + indicator.price}
                  </button>
                  <p className="text-center text-sm text-slate-500 mt-2 font-medium">
                    You will be redirected to our secure payment gateway
                  </p>
                </form>
              )}

              <div className="mt-10 text-center w-full pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600 flex items-center justify-center gap-2 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  100% Secure Payment
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[280px]">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <Lock className="w-5 h-5 text-slate-700 mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">256-bit SSL</span>
                  <span className="text-[10px] text-slate-500">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Instant Setup</span>
                  <span className="text-[10px] text-slate-500">Automated Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full border-t border-slate-200 bg-white py-6 px-4 md:px-8 text-center md:text-left">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <span>© {new Date().getFullYear()} Veridian. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

