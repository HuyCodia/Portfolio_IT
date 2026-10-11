import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Alex Vance — Senior Creative Developer & Interaction Engineer",
  description:
    "Awwwards-level creative development portfolio featuring real-time canvas scrollytelling, high-performance interactions, and digital experiences.",
  keywords: [
    "Creative Developer",
    "WebGL",
    "Framer Motion",
    "Next.js 14",
    "Interactive Design",
    "Scrollytelling",
    "Frontend Engineer",
  ],
  authors: [{ name: "Alex Vance" }],
  openGraph: {
    title: "Alex Vance — Senior Creative Developer",
    description:
      "Crafting visceral digital experiences at the intersection of motion, code, and design.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a13",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#070a13] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
