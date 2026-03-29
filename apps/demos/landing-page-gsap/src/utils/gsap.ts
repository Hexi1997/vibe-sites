// src/utils/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins (execute once)
gsap.registerPlugin(ScrollTrigger);

// Export gsap instance for global use
export { gsap, ScrollTrigger };

// Refresh ScrollTrigger (call after DOM changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Get all ScrollTriggers
export const getAllScrollTriggers = () => {
  return ScrollTrigger.getAll();
};

// Kill all ScrollTriggers (for cleanup)
export const killAllScrollTriggers = () => {
  getAllScrollTriggers().forEach((st) => st.kill());
};
