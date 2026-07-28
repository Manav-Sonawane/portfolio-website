/**
 * MAAV_OS — GSAP plugin registration
 * Import this file once at the app root (layout.tsx or a client wrapper).
 * All other files import from here so plugins are never registered twice.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
