import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Check,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
} from "lucide-react";

type PlanKey = "basic" | "pro" | "elite";

const PLANS: Record<PlanKey, { name: string; price: number; features: string[] }> = {
  basic: {
    name: "Basic",
    price: 1499,
    features: ["2 core indicators", "Daily signals", "Email alerts", "Community access"],
  },
  pro: {
    name: "Pro",
    price: 3999,
    features: [
      "All 6 indicators",
      "Multi-timeframe analysis",
      "Real-time alerts",
      "Weekly strategy session",
    ],
  },
  elite: {
    name: "Elite",
    price: 9999,
    features: [
      "Everything in Pro",
      "Lifetime updates",
      "Private mentor desk",
      "API & webhook access",
    ],
  },
};

type Search = { plan?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    plan: typeof s.plan === "string" ? s.plan : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Veridian" },
      { name: "description", content: "Secure checkout for Veridian indicator plans. UPI, cards and net banking." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { plan } = useSearch({ from: "/checkout" });
  const planKey = (plan && plan in PLANS ? plan : "pro") as PlanKey;
  const selected = PLANS[planKey];

  const [method, setMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const subtotal = selected.price;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto flex max-w-2xl flex-col items-center px-5 py-20 text-center lg:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-profit/15">
            <Check className="h-8 w-8 text-profit" strokeWidth={2.5} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Payment successful</h1>
          <p className="mt-3 text-muted-foreground">
            Welcome to Veridian {selected.name}. Access details and your invoice have been sent to your email.
          </p>
          <div className="mt-8 w-full rounded-xl border border-border/60 bg-surface p-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order total</span>
              <span className="font-mono text-lg font-semibold">{formatINR(total)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm">{selected.name}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-mono text-xs">VRD-{Date.now().toString().slice(-8)}</span>
            </div>
          </div>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-gold to-gold/80 px-6 py-3 text-sm font-semibold text-gold-foreground"
          >
            Back to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Secure checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete your purchase with your preferred payment method.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-3">
            {/* Contact */}
            <Section title="Contact details" step="01">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arjun Sharma"
                    className="input"
                  />
                </Field>
                <Field label="Email address">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input"
                  />
                </Field>
                <Field label="Mobile number" className="sm:col-span-2">
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-border bg-surface px-3 font-mono text-sm text-muted-foreground">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="input rounded-l-none"
                    />
                  </div>
                </Field>
              </div>
            </Section>

            {/* Payment method */}
            <Section title="Payment method" step="02">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MethodBtn icon={Smartphone} label="UPI" sub="GPay, PhonePe" active={method === "upi"} onClick={() => setMethod("upi")} />
                <MethodBtn icon={CreditCard} label="Card" sub="Credit / Debit" active={method === "card"} onClick={() => setMethod("card")} />
                <MethodBtn icon={Building2} label="Net Banking" sub="All banks" active={method === "netbanking"} onClick={() => setMethod("netbanking")} />
                <MethodBtn icon={Wallet} label="Wallet" sub="Paytm, Mobikwik" active={method === "wallet"} onClick={() => setMethod("wallet")} />
              </div>

              <div className="mt-6 rounded-lg border border-border/60 bg-background/60 p-5">
                {method === "upi" && (
                  <div className="space-y-4">
                    <Field label="UPI ID">
                      <input required placeholder="yourname@okicici" className="input" />
                    </Field>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>Pay with:</span>
                      {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((a) => (
                        <span key={a} className="rounded-md border border-border bg-surface px-2.5 py-1">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {method === "card" && (
                  <div className="space-y-4">
                    <Field label="Card number">
                      <input required placeholder="1234 5678 9012 3456" className="input font-mono" />
                    </Field>
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Expiry">
                        <input required placeholder="MM / YY" className="input font-mono" />
                      </Field>
                      <Field label="CVV">
                        <input required placeholder="•••" className="input font-mono" />
                      </Field>
                      <Field label="Name on card">
                        <input required placeholder="Full name" className="input" />
                      </Field>
                    </div>
                  </div>
                )}
                {method === "netbanking" && (
                  <Field label="Select your bank">
                    <select required className="input">
                      <option value="">Choose bank…</option>
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Yes Bank", "IndusInd Bank", "Punjab National Bank"].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                )}
                {method === "wallet" && (
                  <Field label="Select wallet">
                    <select required className="input">
                      <option value="">Choose wallet…</option>
                      {["Paytm", "Mobikwik", "Amazon Pay", "Freecharge"].map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </Field>
                )}
              </div>
            </Section>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold to-gold/80 px-6 py-4 text-base font-semibold text-gold-foreground shadow-[0_0_30px_-8px_oklch(0.82_0.14_85/0.6)] transition-transform hover:-translate-y-0.5"
            >
              <Lock className="h-4 w-4" /> Pay {formatINR(total)} securely
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-profit" /> 256-bit SSL secured</span>
              <span>·</span>
              <span>7-day money-back guarantee</span>
              <span>·</span>
              <span>GST invoice included</span>
            </div>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-border/60 bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Order summary
              </h2>

              <div className="mt-5 rounded-lg border border-border/60 bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">Monthly subscription</div>
                  </div>
                  <div className="font-mono text-lg">{formatINR(subtotal)}</div>
                </div>
                <ul className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-foreground/90">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-profit" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan switcher */}
              <div className="mt-5">
                <div className="text-xs text-muted-foreground">Change plan</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(Object.keys(PLANS) as PlanKey[]).map((k) => (
                    <Link
                      key={k}
                      to="/checkout"
                      search={{ plan: k }}
                      className={`rounded-md border px-2 py-2 text-center text-xs ${
                        k === planKey
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {PLANS[k].name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-border/60 pt-5 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row label="GST (18%)" value={formatINR(gst)} muted />
                <div className="my-2 h-px bg-border/60" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono text-xl font-semibold text-gold">{formatINR(total)}</span>
                </div>
              </div>

              <div className="mt-5 rounded-md border border-border/60 bg-background/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                Trading involves risk. Past performance does not guarantee future results.
                You acknowledge our terms by completing this purchase.
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <style>{`
        .input {
          width: 100%;
          background: var(--color-input);
          color: var(--color-foreground);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px oklch(0.82 0.14 85 / 0.15);
        }
      `}</style>
    </div>
  );
}

function Section({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border/60 bg-surface p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-xs text-gold">{step}</span>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function MethodBtn({ icon: Icon, label, sub, active, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors ${
        active ? "border-gold bg-gold/10" : "border-border bg-background hover:border-border/80 hover:bg-surface-elevated"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-gold" : "text-muted-foreground"}`} />
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-muted-foreground" : "text-foreground"}`}>{label}</span>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );
}
