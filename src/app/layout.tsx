import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CRTOverlay from "@/components/fx/CRTOverlay";
import RouteTransition from "@/components/fx/RouteTransition";
import BootSequence from "@/components/fx/BootSequence";
import CursorGlow from "@/components/fx/CursorGlow";

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
  metadataBase: new URL("https://manav-sonawane.me"),
  openGraph: {
    title: "Manav Sonawane | Backend & Full-Stack Developer",
    description:
      "Portfolio of Manav Sonawane — Backend & Full-Stack Developer experienced in scalable systems, APIs, and real-world projects.",
    url: "https://manav-sonawane.me",
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
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden font-mono">
        {/* Custom cursor glowing phosphor dot snapping to brackets [ ] */}
        <CursorGlow />
        {/* Boot animation covering the screen on cold load */}
        <BootSequence />
        {/* Persistent CRT scanline + vignette overlay — felt, not seen */}
        <CRTOverlay />
        <Navbar />
        <div className="flex-1 flex flex-col w-full">
          <RouteTransition>{children}</RouteTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}

