import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Backdrop from "@/components/fx/Backdrop";
import Cursor from "@/components/fx/Cursor";
import Preloader from "@/components/fx/Preloader";
import PageTransition from "@/components/fx/PageTransition";
import Hud from "@/components/Hud";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: {
    default: "Manav Sonawane | Full-Stack Developer & AI Builder",
    template: "%s | Manav Sonawane",
  },
  description:
    "Full-Stack Developer & AI Builder building scalable web applications, APIs, and LLM-powered systems. Experience with Python, Java, TypeScript, Django, FastAPI, Node.js, LangGraph, and Google Cloud.",
  keywords: [
    "Manav Sonawane",
    "Backend Developer",
    "Full Stack Developer",
    "Django Developer",
    "FastAPI Developer",
    "Node.js Developer",
    "AI Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Manav Sonawane" }],
  creator: "Manav Sonawane",
  metadataBase: new URL("https://manav-sonawane.me"),
  openGraph: {
    title: "Manav Sonawane | Full-Stack Developer & AI Builder",
    description:
      "Portfolio of Manav Sonawane — Full-Stack Developer & AI Builder experienced in scalable systems, APIs, LLM agents, and real-world projects.",
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

export const viewport: Viewport = {
  themeColor: "#070b13",
  colorScheme: "dark",
};

// Runs before first paint: flag first-visit sessions so the preloader shows with no flash
const PRELOAD_GATE = `try{if(!sessionStorage.getItem("booted"))document.documentElement.classList.add("preloading")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOAD_GATE }} />
        <noscript>
          <style>{`.reveal-init{opacity:1!important}.split-init{visibility:visible!important}.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <Backdrop />
        <div className="grain" aria-hidden />
        <Cursor />
        <Preloader />
        <PageTransition />
        <Navbar />
        <Hud />
        <CommandPalette />
        <div className="relative flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
