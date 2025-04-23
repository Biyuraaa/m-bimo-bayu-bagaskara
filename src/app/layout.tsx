import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Bimo Bayu Bagaskara | Portfolio",
  description:
    "Full Stack Developer specializing in web development, mobile applications, and software solutions. Explore my projects and experience.",
  keywords: [
    "Bimo Bayu",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "M Bimo Bayu Bagaskara" }],
  creator: "M Bimo Bayu Bagaskara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://m-bimo-bayu-bagaskara.vercel.app",
    title: "M Bimo Bayu Bagaskara | Portfolio",
    description: "Full Stack Developer Portfolio of M Bimo Bayu Bagaskara",
    siteName: "Bimo Bayu Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 selection:bg-blue-500/70 selection:text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
