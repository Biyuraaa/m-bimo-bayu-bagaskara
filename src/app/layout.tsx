import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "../components/ui/sonner";

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Improve metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://bimobayubagaskara.com"),
  title: {
    template: "%s | M Bimo Bayu Bagaskara",
    default: "M Bimo Bayu Bagaskara | Full Stack Developer",
  },
  description:
    "Full Stack Developer specializing in web development, mobile applications, and software solutions. Explore my projects and experience.",
  keywords: [
    "M Bimo Bayu Bagaskara",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Portfolio",
  ],
  authors: [
    { name: "M Bimo Bayu Bagaskara", url: "https://bimobayubagaskara.com" },
  ],
  creator: "M Bimo Bayu Bagaskara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bimobayubagaskara.com",
    title: "M Bimo Bayu Bagaskara | Full Stack Developer",
    description:
      "Full Stack Developer specializing in web development, mobile applications, and software solutions.",
    siteName: "Bimo Bayu Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M Bimo Bayu Bagaskara - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M Bimo Bayu Bagaskara | Full Stack Developer",
    description:
      "Full Stack Developer specializing in web development, mobile applications, and software solutions.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-slate-950 selection:bg-blue-500/70 selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Toaster />

        {/* Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
