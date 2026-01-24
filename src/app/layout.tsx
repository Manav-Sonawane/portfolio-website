/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manav Sonawane | Backend & Full-Stack Developer",
    template: "%s | Manav Sonawane",
  },
  description:
    "Backend & Full-Stack Developer building scalable web applications, APIs, and production-ready systems. Experience with Django, FastAPI, Node.js, and system design.",
  keywords: [
    "Manav Sonawane",
    "Backend Developer",
    "Full Stack Developer",
    "Django Developer",
    "FastAPI Developer",
    "Node.js Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Manav Sonawane" }],
  creator: "Manav Sonawane",
  metadataBase: new URL("https://YOUR_DOMAIN_HERE"),
  openGraph: {
    title: "Manav Sonawane | Backend & Full-Stack Developer",
    description:
      "Portfolio of Manav Sonawane — Backend & Full-Stack Developer experienced in scalable systems, APIs, and real-world projects.",
    url: "https://YOUR_DOMAIN_HERE",
    siteName: "Manav Sonawane Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Manav Sonawane Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
