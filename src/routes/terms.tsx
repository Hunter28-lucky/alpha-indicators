import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Scale, Target, ScrollText, AlertTriangle, Scale3d, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
        
        {/* Header Section */}
        <div className="mb-16 border-b border-border/40 pb-10 text-center md:text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 inline-block">
            · Legal Agreement
          </span>
          <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl tracking-tight text-foreground">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-sm text-muted-foreground font-mono">
            Last Updated: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert max-w-none space-y-12">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="shrink-0 md:mt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/60">
                <ScrollText className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction & Acceptance</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By accessing, continuing to use, or interacting with the Veridian website, platform, and associated social media pixels and tracking integrations (such as Meta, Google Analytics, and Facebook), you hereby implicitly and explicitly agree to be bound by these Terms and Conditions. Read these comprehensive rules governing the operation of Veridian Capital Tools. If you do not agree with any of these terms, you are officially prohibited from using or accessing this site.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Our site uses industry-standard cookies, local storage, and third-party advertising scripts natively to collect aggregated metrics—just as platforms like Facebook (Meta) and Google do natively across the internet. By interacting with the site, you oblige and grant consent to this data processing mechanism.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-2xl bg-red-950/10 border border-red-500/20">
            <div className="shrink-0 md:mt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 border border-red-500/30">
                <AlertTriangle className="h-5 w-5 text-red-500" strokeWidth={2} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-4">2. Strict "No Financial Advice" Disclaimer</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong>VERIDIAN IS NOT A SEBI-REGISTERED INVESTMENT ADVISOR (RIA), PORTFOLIO MANAGER, OR RESEARCH ANALYST.</strong> 
                <br /><br />
                All material, charts, alerts, data, and scripts hosted or licensed by Veridian constitute mere online knowledge, mathematical algorithms, and broad market theories aggregated into indicators. <strong>We are NOT responsible for any financial loss or harm you incur as a result of trading.</strong> 
              </p>
              <ul className="mt-4 list-disc pl-5 text-sm text-foreground/80 space-y-2">
                <li>Trading stocks, forex, crypto, and derivatives involves an exceptionally high degree of risk and is inherently not suitable for all investors.</li>
                <li>You acknowledge that you could lose some or all of your initial investment.</li>
                <li>Any simulated tracking records shown are mathematical extrapolations of past market data; past performance never guarantees future realization of gains.</li>
              </ul>
              <p className="text-sm text-foreground/80 leading-relaxed mt-4 font-medium">
                By purchasing or utilizing our indicators, you completely indemnify Veridian from any financial, psychological, or operational damages directly or indirectly related to market volatility. You trade solely at your own risk.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="shrink-0 md:mt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/60">
                <Target className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Data & Platform Disclosures</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Veridian runs automated signals via TradingView and external webhooks. While we strive to ensure 99.9% uptime, we are not liable for server dropouts, missed alerts, API failures, delayed push notifications, or platform maintenance windows on third-party servers. All digital tooling is licensed "AS-IS", and any technical outages are considered systematic realities out of Veridian's direct scope of liability.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="shrink-0 md:mt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/60">
                <ShieldAlert className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Indemnification & Absolute Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Under absolutely no circumstance shall Veridian, its developers, founders, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages—including but not restricted to: loss of capital, loss of data, loss of profit, or loss of business opportunity—resulting from the use, application, or interpretation of the indicators provided. 
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                This limitation of liability is comprehensive and spans all claims regardless of origin, be it under contract, tort (including negligence), strict liability, or standard statutory causes of action. If you feel triggered by risk, you must close this webpage immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 border-t border-border/40 pt-10">
            <div className="shrink-0 md:mt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/60">
                <Scale className="h-5 w-5 text-emerald-500" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Governing Law & Jurisdiction (India)</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These sweeping Terms & Conditions have been constructed in accordance with the legislative frameworks of India, including but not restricted to the Information Technology Act, 2000. 
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Any legal discrepancy, claim, or judicial conflict arising out of the interpretations of these terms or the functionality of Veridian Capital Tools shall fall under the sole, exclusive, and unyielding jurisdiction of the civil courts and tribunals located in India. You hereby irrevocably consent to this statutory jurisdiction as a prior requisite to browsing the web application.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}