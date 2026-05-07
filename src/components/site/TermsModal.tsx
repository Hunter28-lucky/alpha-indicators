import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function TermsModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("veridian_terms_accepted");
    if (!accepted) {
      // Slight delay for psychological smoothness
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const acceptTerms = () => {
    localStorage.setItem("veridian_terms_accepted", "true");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center pb-6 lg:pb-10">
      <div 
        className="pointer-events-auto w-full max-w-[340px] sm:max-w-xl bg-surface/90 backdrop-blur-2xl border border-border/60 p-6 rounded-3xl shadow-[0_40px_80px_-20px_oklch(0_0_0/0.8)] flex flex-col sm:flex-row items-center justify-between gap-6 transform animate-in slide-in-from-bottom-12 fade-in duration-700 ease-out"
      >
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-foreground font-semibold">
            <div className="flex items-center justify-center p-1.5 bg-emerald-500/10 rounded-full">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-[15px] tracking-tight">Your data & experience</span>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            To provide our analytical tools effectively, we use standard industry practices (similar to Meta & Google). Handshake on our {" "}
            <Link 
              to="/terms" 
              onClick={() => setShow(false)}
              className="text-foreground underline decoration-border hover:decoration-emerald-500 underline-offset-2 transition-all font-medium"
            >
              Terms & Conditions
            </Link>
            ? We're a software tool, not financial advisors.
          </p>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto flex flex-col">
          <button
            onClick={acceptTerms}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_-6px_oklch(0.82_0.14_85/0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}