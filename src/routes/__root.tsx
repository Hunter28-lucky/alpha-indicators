import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TermsModal } from "@/components/site/TermsModal";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Veridian | Ultimate Powerful Trading Indicators" },
      { name: "description", content: "Looking for a new indicator? Access the most powerful trading indicators available. Elevate your strategy with our premium and custom trading indicator solutions." },
      { name: "keywords", content: "indicator, new indicator, powerful trading indicator, best trading indicator, custom trading indicator, tradingview indicators, powerful indicator" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Veridian | Ultimate Powerful Trading Indicators" },
      { property: "og:description", content: "Looking for a new indicator? Access the most powerful trading indicators available. Elevate your strategy with our premium and custom trading indicator solutions." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Veridian | Ultimate Powerful Trading Indicators" },
      { name: "twitter:description", content: "Looking for a new indicator? Access the most powerful trading indicators available. Elevate your strategy with our premium and custom trading indicator solutions." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <TermsModal />
    </>
  );
}
