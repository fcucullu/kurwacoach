import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kurwacoach.franciscocucullu.com"),
  title: "KurwaCoach",
  description: "Learn Polish the hard way",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "KurwaCoach" },
  other: { google: "notranslate" },
  openGraph: {
    title: "Kurwa Coach",
    description: "Learn Polish the hard way. Gamified phrase learning with audio pronunciation, streaks, and trophies.",
    url: "https://kurwacoach.franciscocucullu.com",
    siteName: "Kurwa Coach",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurwa Coach",
    description: "Learn Polish the hard way. Gamified phrase learning with audio pronunciation, streaks, and trophies.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#DC2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" translate="no" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ServiceWorkerRegister />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
