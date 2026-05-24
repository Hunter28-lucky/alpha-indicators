import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect } from "react";

import ind1 from "@/assets/indicator-1.jpg";
import ind2 from "@/assets/indicator-2.jpg";
import ind3 from "@/assets/indicator-3.jpg";
import ind4 from "@/assets/indicator-4.jpg";

export const Route = createFileRoute("/checkout/$id")({
  component: CheckoutPage,
});

/* ────────────────────────────────────────────────────────────────────────────
   Product catalog
   ──────────────────────────────────────────────────────────────────────── */

const PRODUCTS: Record<string, {
  name: string;
  price: number;
  features: string[];
  images: string[];
}> = {
  liquidity: {
    name: "Liquidity Zones Pro",
    price: 1000,
    features: ["Real-time liquidity mapping", "Order block detection", "Multi-timeframe analysis", "Custom alerts"],
    images: [ind1, ind2, ind3],
  },
  "smart-money": {
    name: "Smart Money Engine",
    price: 1000,
    features: ["Market structure shifts", "BOS & CHoCH detection", "Confluence filters", "Premium support"],
    images: [ind2, ind3, ind4],
  },
  "mean-reversion": {
    name: "FVG Precision",
    price: 1000,
    features: ["Dynamic bands", "Reversal signals", "Volatility adjustment", "Backtested settings"],
    images: [ind3, ind4, ind1],
  },
  "volume-footprint": {
    name: "Volume Footprint",
    price: 1000,
    features: ["Volume profile", "Delta footprint", "Real-time order flow", "Intraday accuracy"],
    images: [ind4, ind1, ind2],
  },
};

/* ────────────────────────────────────────────────────────────────────────────
   Google Sheets — fire-and-forget via sendBeacon
   ──────────────────────────────────────────────────────────────────────── */

const SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbwQnuodPOb6U8JWmxN031mDFjoAi4PThrnYx-FcmPsnV-77soheA801EpCRNY_limoQ/exec";

function saveToSheet(d: Record<string, string | number>) {
  try {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(d)) p.append(k, String(v));
    navigator.sendBeacon(SHEET_WEBHOOK, new Blob([p.toString()], { type: "application/x-www-form-urlencoded" }));
  } catch { /* never block payment flow */ }
}

/* ────────────────────────────────────────────────────────────────────────────
   Checkout page — ZERO React state for form inputs
   All UI transitions use plain DOM classList toggles.
   ──────────────────────────────────────────────────────────────────────── */

function CheckoutPage() {
  const { id } = Route.useParams();
  const product = PRODUCTS[id] || PRODUCTS["liquidity"];

  /* ── DOM refs ── */
  const formBox    = useRef<HTMLDivElement>(null);
  const pendingBox = useRef<HTMLDivElement>(null);
  const successBox = useRef<HTMLDivElement>(null);
  const failBox    = useRef<HTMLDivElement>(null);
  const payBtn     = useRef<HTMLButtonElement>(null);
  const payLink    = useRef<HTMLAnchorElement>(null);
  const amtEl      = useRef<HTMLSpanElement>(null);
  const oidEl      = useRef<HTMLSpanElement>(null);
  const pollId     = useRef<ReturnType<typeof setInterval> | null>(null);
  const imgIdx     = useRef(0);
  const sliderBox  = useRef<HTMLDivElement>(null);

  /* ── Cleanup ── */
  useEffect(() => {
    // Image slider via DOM
    const slideTimer = setInterval(() => {
      const el = sliderBox.current;
      if (!el) return;
      const imgs = el.querySelectorAll<HTMLImageElement>("[data-slide]");
      const dots = el.querySelectorAll<HTMLDivElement>("[data-dot]");
      if (!imgs.length) return;
      imgs[imgIdx.current].style.opacity = "0";
      dots[imgIdx.current]?.classList.replace("w-5", "w-1.5");
      dots[imgIdx.current]?.classList.replace("bg-white", "bg-white/60");
      imgIdx.current = (imgIdx.current + 1) % imgs.length;
      imgs[imgIdx.current].style.opacity = "1";
      dots[imgIdx.current]?.classList.replace("w-1.5", "w-5");
      dots[imgIdx.current]?.classList.replace("bg-white/60", "bg-white");
    }, 3500);

    return () => {
      clearInterval(slideTimer);
      if (pollId.current) clearInterval(pollId.current);
    };
  }, []);

  /* ── Switch visible panel ── */
  function show(panel: "form" | "pending" | "success" | "fail") {
    formBox.current!.style.display    = panel === "form"    ? "" : "none";
    pendingBox.current!.style.display = panel === "pending" ? "" : "none";
    successBox.current!.style.display = panel === "success" ? "" : "none";
    failBox.current!.style.display    = panel === "fail"    ? "" : "none";
  }

  /* ── Poll payment gateway ── */
  function poll(orderId: string, customerName: string, customerEmail: string, customerPhone: string) {
    if (pollId.current) clearInterval(pollId.current);
    pollId.current = setInterval(async () => {
      try {
        const r = await fetch(`https://gatewayphp-shopifyin05.wasmer.app/api/payment_status.php?order_id=${orderId}`);
        const raw = await r.text();
        let st = "";
        try { const j = JSON.parse(raw); st = (j.status || j.payment_status || raw).toString().toLowerCase().trim(); }
        catch { st = raw.toLowerCase().trim(); }

        if (st === "success") {
          clearInterval(pollId.current!);
          show("success");
          saveToSheet({ name: customerName, email: customerEmail, phone: customerPhone, product: product.name, amount: product.price, orderId, status: "success" });
        } else if (st === "failed" || st === "expired") {
          clearInterval(pollId.current!);
          show("fail");
          saveToSheet({ name: customerName, email: customerEmail, phone: customerPhone, product: product.name, amount: product.price, orderId, status: st });
        }
      } catch { /* ignore */ }
    }, 3000);
  }

  /* ── Submit handler ── */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name  = (fd.get("name")  as string).trim();
    const email = (fd.get("email") as string).trim();
    const phone = (fd.get("phone") as string).trim();
    if (!name || !email || !phone) return;

    // Disable button
    payBtn.current!.disabled = true;
    payBtn.current!.innerHTML = `<svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" class="opacity-75"></path></svg> Creating order...`;

    try {
      const res = await fetch("https://gatewayphp-shopifyin05.wasmer.app/api/create_order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: import.meta.env.VITE_PAYMENT_API_KEY,
          amount: product.price,
          customer_name: name,
          customer_email: email,
          description: `Order for ${product.name}`,
        }),
      });
      const data = await res.json();

      if (data.order_id && data.payment_page_url) {
        amtEl.current!.textContent  = `₹${data.amount}`;
        oidEl.current!.textContent  = data.order_id;
        payLink.current!.href       = data.payment_page_url;
        show("pending");
        saveToSheet({ name, email, phone, product: product.name, amount: data.amount, orderId: data.order_id, status: "pending" });
        poll(data.order_id, name, email, phone);
      } else {
        alert("Failed to create order. Please try again.");
        payBtn.current!.disabled = false;
        payBtn.current!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Pay ₹${product.price}`;
      }
    } catch {
      alert("Network error — check your connection.");
      payBtn.current!.disabled = false;
      payBtn.current!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Pay ₹${product.price}`;
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════════════ */
  return (
    <div style={{ fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif" }}
         className="flex flex-col min-h-screen bg-slate-100 text-slate-900">

      <main className="flex-1 flex justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row border border-slate-200">

          {/* ═══════════ LEFT — Order summary ═══════════ */}
          <div className="w-full lg:w-5/12 bg-slate-50/50 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <Link to="/indicators"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors w-fit">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </Link>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">{product.name}</h2>
            <p className="text-sm font-medium text-emerald-600 mb-6 bg-emerald-50 px-2.5 py-1 rounded-md w-fit">Lifetime Access</p>

            {/* Image slider — pure DOM, no React state */}
            <div ref={sliderBox} className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 shadow-md border border-slate-200">
              {product.images.map((src, i) => (
                <img key={i} data-slide src={src} alt={`Preview ${i+1}`}
                     style={{ opacity: i === 0 ? 1 : 0, transition: "opacity 1s ease-in-out" }}
                     className="absolute inset-0 w-full h-full object-cover" />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {product.images.map((_, i) => (
                  <div key={i} data-dot
                       className={`h-1.5 rounded-full transition-all duration-500 ${i === 0 ? "w-5 bg-white" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's included</h4>
              <ul className="space-y-3.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                    <svg className="w-4 h-4 text-emerald-500 mr-3 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-end">
              <span className="text-slate-500 font-medium">Total Amount</span>
              <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
            </div>
          </div>

          {/* ═══════════ RIGHT — Payment ═══════════ */}
          <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-white flex flex-col">
            <div className="flex items-center gap-2 mb-8 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span className="font-bold text-xs tracking-wide uppercase">Secure Checkout</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Payment</h1>
            <p className="text-slate-500 mb-8">Fill in your details to get instant access.</p>

            <div className="flex-1 flex flex-col w-full max-w-sm mx-auto">

              {/* ── 1. FORM ── */}
              <div ref={formBox}>
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="inp-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input id="inp-name" name="name" type="text" required autoComplete="name"
                             placeholder="John Doe"
                             className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white
                                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                                        outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="inp-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <input id="inp-email" name="email" type="email" required autoComplete="email"
                             placeholder="john@example.com"
                             className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white
                                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                                        outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                    </div>
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor="inp-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <input id="inp-phone" name="phone" type="tel" required autoComplete="tel"
                             placeholder="+91 98765 43210"
                             className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white
                                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                                        outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                    </div>
                  </div>

                  <button ref={payBtn} type="submit"
                          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl
                                     bg-slate-900 hover:bg-slate-800 active:scale-[0.98]
                                     text-white font-bold text-lg transition-all shadow-lg
                                     disabled:opacity-70 disabled:cursor-not-allowed mt-1">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Pay ₹{product.price}
                  </button>
                  <p className="text-center text-sm text-slate-400 font-medium -mt-1">
                    You will be redirected to our secure payment gateway
                  </p>
                </form>
              </div>

              {/* ── 2. WAITING FOR PAYMENT ── */}
              <div ref={pendingBox} style={{ display: "none" }} className="flex flex-col items-center gap-6 w-full">
                <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl w-full">
                  <p className="text-sm text-slate-500 mb-1">Amount to pay</p>
                  <p className="text-3xl font-bold text-slate-900"><span ref={amtEl}>₹0</span></p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">Order ID: <span ref={oidEl}>—</span></p>
                </div>
                <a ref={payLink} href="#" target="_blank" rel="noopener noreferrer"
                   className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-lg transition-all shadow-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                  Proceed to Pay
                </a>
                <div className="flex flex-col items-center justify-center p-5 border border-slate-200 bg-white rounded-2xl w-full shadow-sm">
                  <svg className="w-7 h-7 text-emerald-500 animate-spin mb-3" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75"></path></svg>
                  <p className="text-slate-900 font-bold">Waiting for payment...</p>
                  <p className="text-sm text-slate-500 mt-1 text-center">This page updates automatically — don't close it.</p>
                </div>
              </div>

              {/* ── 3. SUCCESS ── */}
              <div ref={successBox} style={{ display: "none" }} className="flex flex-col items-center justify-center text-center p-8 border border-emerald-200 bg-emerald-50 rounded-2xl w-full">
                <svg className="w-16 h-16 text-emerald-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful! 🎉</h3>
                <p className="text-slate-600 mb-8">Your order has been confirmed. You now have lifetime access to <strong>{product.name}</strong>.</p>
                <Link to="/" className="w-full block text-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]">
                  Return Home
                </Link>
              </div>

              {/* ── 4. FAILED ── */}
              <div ref={failBox} style={{ display: "none" }} className="p-4 bg-red-50 text-red-600 rounded-xl w-full text-center font-medium border border-red-100">
                Payment failed or expired.{" "}
                <button onClick={() => window.location.reload()} className="underline font-bold">Refresh</button> and try again.
              </div>

              {/* ── Trust badges ── */}
              <div className="mt-8 text-center w-full pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600 flex items-center justify-center gap-2 font-medium">
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                  100% Secure Payment
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-[280px] mx-auto">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <svg className="w-5 h-5 text-slate-700 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">256-bit SSL</span>
                  <span className="text-[10px] text-slate-500">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <svg className="w-5 h-5 text-emerald-500 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
