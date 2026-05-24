import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import {
  Check,
  ShieldCheck,
  ArrowLeft,
  Smartphone,
  Lock,
  CheckCircle2,
  Loader2,
  Phone as PhoneIcon,
  Mail,
  User,
} from "lucide-react";

import ind1 from "@/assets/indicator-1.jpg";
import ind2 from "@/assets/indicator-2.jpg";
import ind3 from "@/assets/indicator-3.jpg";
import ind4 from "@/assets/indicator-4.jpg";

export const Route = createFileRoute("/checkout/$id")({
  component: CheckoutPage,
});

// ─── Product Data ────────────────────────────────────────────────────────────

const INDICATORS: Record<
  string,
  { name: string; price: number; features: string[]; images: string[] }
> = {
  liquidity: {
    name: "Liquidity Zones Pro",
    price: 1000,
    features: [
      "Real-time liquidity mapping",
      "Order block detection",
      "Multi-timeframe analysis",
      "Custom alerts",
    ],
    images: [ind1, ind2, ind3],
  },
  "smart-money": {
    name: "Smart Money Engine",
    price: 1000,
    features: [
      "Market structure shifts",
      "BOS & CHoCH detection",
      "Confluence filters",
      "Premium support",
    ],
    images: [ind2, ind3, ind4],
  },
  "mean-reversion": {
    name: "FVG Precision",
    price: 1000,
    features: [
      "Dynamic bands",
      "Reversal signals",
      "Volatility adjustment",
      "Backtested settings",
    ],
    images: [ind3, ind4, ind1],
  },
  "volume-footprint": {
    name: "Volume Footprint",
    price: 1000,
    features: [
      "Volume profile",
      "Delta footprint",
      "Real-time order flow",
      "Intraday accuracy",
    ],
    images: [ind4, ind1, ind2],
  },
};

// ─── Google Sheets Helper ────────────────────────────────────────────────────

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwQnuodPOb6U8JWmxN031mDFjoAi4PThrnYx-FcmPsnV-77soheA801EpCRNY_limoQ/exec";

function logToSheet(data: Record<string, string | number>) {
  try {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(data)) {
      params.append(k, String(v));
    }
    // navigator.sendBeacon is fire-and-forget — never blocks, never errors visibly
    const blob = new Blob([params.toString()], {
      type: "application/x-www-form-urlencoded",
    });
    navigator.sendBeacon(SHEETS_URL, blob);
  } catch {
    // silently ignore — sheet logging must never break payment
  }
}

// ─── Main Checkout Page ──────────────────────────────────────────────────────

function CheckoutPage() {
  const { id } = Route.useParams();
  const indicator = INDICATORS[id] || INDICATORS["liquidity"];

  // ── All DOM refs — no React state means zero re-renders while typing ──
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // UI element refs for showing/hiding sections without React state
  const formSectionRef = useRef<HTMLDivElement>(null);
  const paymentSectionRef = useRef<HTMLDivElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);
  const failedSectionRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const btnTextRef = useRef<HTMLSpanElement>(null);
  const btnSpinnerRef = useRef<HTMLSpanElement>(null);
  const amountDisplayRef = useRef<HTMLParagraphElement>(null);
  const orderIdDisplayRef = useRef<HTMLParagraphElement>(null);
  const payLinkRef = useRef<HTMLAnchorElement>(null);
  const productNameRef = useRef<HTMLElement>(null);

  // Polling ref
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Image slider ref
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderIndexRef = useRef(0);

  useEffect(() => {
    // Simple image slider using direct DOM manipulation
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const images = sliderRef.current.querySelectorAll("img");
      const dots = sliderRef.current.querySelectorAll("[data-dot]");
      const total = images.length;
      if (total === 0) return;

      // Hide current
      images[sliderIndexRef.current]?.classList.remove("opacity-100");
      images[sliderIndexRef.current]?.classList.add("opacity-0");
      dots[sliderIndexRef.current]?.classList.remove("w-5", "bg-white", "shadow-sm");
      dots[sliderIndexRef.current]?.classList.add("w-1.5", "bg-white/60");

      // Next
      sliderIndexRef.current = (sliderIndexRef.current + 1) % total;

      // Show next
      images[sliderIndexRef.current]?.classList.add("opacity-100");
      images[sliderIndexRef.current]?.classList.remove("opacity-0");
      dots[sliderIndexRef.current]?.classList.add("w-5", "bg-white", "shadow-sm");
      dots[sliderIndexRef.current]?.classList.remove("w-1.5", "bg-white/60");
    }, 3500);

    return () => {
      clearInterval(interval);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // ── Show/hide helpers ──
  function showSection(ref: React.RefObject<HTMLDivElement | null>) {
    formSectionRef.current?.classList.add("hidden");
    paymentSectionRef.current?.classList.add("hidden");
    successSectionRef.current?.classList.add("hidden");
    failedSectionRef.current?.classList.add("hidden");
    ref.current?.classList.remove("hidden");
  }

  function setLoading(loading: boolean) {
    if (submitBtnRef.current) submitBtnRef.current.disabled = loading;
    if (btnTextRef.current)
      btnTextRef.current.textContent = loading
        ? "Generating Payment Link..."
        : `Pay ₹${indicator.price}`;
    if (btnSpinnerRef.current)
      btnSpinnerRef.current.classList.toggle("hidden", !loading);
  }

  // ── Poll payment status ──
  function startPolling(orderId: string) {
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `https://gatewayphp-shopifyin05.wasmer.app/api/payment_status.php?order_id=${orderId}`
        );
        const text = await res.text();
        let status = "";
        try {
          const json = JSON.parse(text);
          status = (json.status || json.payment_status || text)
            .toString()
            .toLowerCase()
            .trim();
        } catch {
          status = text.toLowerCase().trim();
        }

        if (status === "success") {
          if (pollRef.current) clearInterval(pollRef.current);
          if (productNameRef.current)
            productNameRef.current.textContent = indicator.name;
          showSection(successSectionRef);
          logToSheet({
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            product: indicator.name,
            amount: indicator.price,
            orderId,
            status: "success",
          });
        } else if (status === "failed" || status === "expired") {
          if (pollRef.current) clearInterval(pollRef.current);
          showSection(failedSectionRef);
          logToSheet({
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            product: indicator.name,
            amount: indicator.price,
            orderId,
            status,
          });
        }
      } catch {
        // silently ignore polling errors
      }
    }, 3000);
  }

  // ── Handle form submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";

    if (!name || !email || !phone) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://gatewayphp-shopifyin05.wasmer.app/api/create_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: import.meta.env.VITE_PAYMENT_API_KEY,
            amount: indicator.price,
            customer_name: name,
            customer_email: email,
            description: `Order for ${indicator.name}`,
          }),
        }
      );

      const data = await res.json();

      if (data.order_id && data.payment_page_url) {
        // Update payment section UI
        if (amountDisplayRef.current)
          amountDisplayRef.current.textContent = `₹${data.amount}`;
        if (orderIdDisplayRef.current)
          orderIdDisplayRef.current.textContent = `Order ID: ${data.order_id}`;
        if (payLinkRef.current) payLinkRef.current.href = data.payment_page_url;

        showSection(paymentSectionRef);

        // Log to Google Sheets
        logToSheet({
          name,
          email,
          phone,
          product: indicator.name,
          amount: data.amount,
          orderId: data.order_id,
          status: "pending",
        });

        startPolling(data.order_id);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch {
      alert("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-emerald-200">
      <main className="flex-1 flex justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row border border-slate-200">
          {/* ── Left: Order Summary ── */}
          <div className="w-full lg:w-5/12 bg-slate-50/50 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <Link
              to="/indicators"
              className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {indicator.name}
            </h2>
            <p className="text-sm font-medium text-emerald-600 mb-6 bg-emerald-50 px-2.5 py-1 rounded-md w-fit">
              Lifetime Access
            </p>

            {/* Image Slider — pure DOM, no state */}
            <div
              ref={sliderRef}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 shadow-md border border-slate-200"
            >
              {indicator.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {indicator.images.map((_, idx) => (
                  <div
                    key={idx}
                    data-dot
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === 0
                        ? "w-5 bg-white shadow-sm"
                        : "w-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                What's included
              </h4>
              <ul className="space-y-3.5">
                {indicator.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-slate-700 font-medium"
                  >
                    <Check className="w-4 h-4 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-4xl font-bold text-slate-900">
                  ₹{indicator.price}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Payment Section ── */}
          <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-white flex flex-col">
            <div className="flex items-center gap-2 mb-8 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <Lock className="w-4 h-4" />
              <span className="font-bold text-xs tracking-wide uppercase">
                Secure Checkout
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Complete Payment
            </h1>
            <p className="text-slate-500 mb-8">
              Fill in your details to get instant access.
            </p>

            <div className="flex-1 flex flex-col w-full max-w-sm mx-auto">
              {/* ── FORM SECTION ── */}
              <div ref={formSectionRef}>
                <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        ref={nameRef}
                        id="checkout-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        ref={emailRef}
                        id="checkout-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        ref={phoneRef}
                        id="checkout-phone"
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    ref={submitBtnRef}
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-lg transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  >
                    <span ref={btnSpinnerRef} className="hidden">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </span>
                    <Lock className="w-5 h-5" />
                    <span ref={btnTextRef}>Pay ₹{indicator.price}</span>
                  </button>

                  <p className="text-center text-sm text-slate-400 font-medium -mt-1">
                    You will be redirected to our secure payment gateway
                  </p>
                </form>
              </div>

              {/* ── PAYMENT PENDING SECTION ── */}
              <div ref={paymentSectionRef} className="hidden w-full flex flex-col items-center gap-6">
                <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl w-full">
                  <p className="text-sm text-slate-500 mb-1">Amount to pay</p>
                  <p ref={amountDisplayRef} className="text-3xl font-bold text-slate-900">
                    ₹0
                  </p>
                  <p
                    ref={orderIdDisplayRef}
                    className="text-xs text-slate-400 mt-2 font-mono"
                  >
                    Order ID: —
                  </p>
                </div>

                <a
                  ref={payLinkRef}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-lg transition-all shadow-lg"
                >
                  <Smartphone className="w-6 h-6" />
                  Proceed to Pay
                </a>

                <div className="flex flex-col items-center justify-center p-5 border border-slate-200 bg-white rounded-2xl w-full shadow-sm">
                  <Loader2 className="w-7 h-7 text-emerald-500 animate-spin mb-3" />
                  <p className="text-slate-900 font-bold">
                    Waiting for payment...
                  </p>
                  <p className="text-sm text-slate-500 mt-1 text-center">
                    This page updates automatically — don't close it.
                  </p>
                </div>
              </div>

              {/* ── SUCCESS SECTION ── */}
              <div
                ref={successSectionRef}
                className="hidden flex flex-col items-center justify-center text-center p-8 border border-emerald-200 bg-emerald-50 rounded-2xl w-full"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Payment Successful! 🎉
                </h3>
                <p className="text-slate-600 mb-8">
                  Your order has been confirmed. You now have lifetime access to{" "}
                  <strong ref={productNameRef}>{indicator.name}</strong>.
                </p>
                <Link
                  to="/"
                  className="w-full block text-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Return Home
                </Link>
              </div>

              {/* ── FAILED SECTION ── */}
              <div
                ref={failedSectionRef}
                className="hidden p-4 bg-red-50 text-red-600 rounded-xl w-full text-center font-medium border border-red-100"
              >
                Payment failed or expired. Please{" "}
                <button
                  onClick={() => window.location.reload()}
                  className="underline font-bold"
                >
                  refresh
                </button>{" "}
                and try again.
              </div>

              {/* ── Trust Badges ── */}
              <div className="mt-8 text-center w-full pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600 flex items-center justify-center gap-2 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  100% Secure Payment
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-[280px] mx-auto">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <Lock className="w-5 h-5 text-slate-700 mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                    256-bit SSL
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Secure Checkout
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                    Instant Setup
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Automated Delivery
                  </span>
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
            <Link to="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Refund Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
