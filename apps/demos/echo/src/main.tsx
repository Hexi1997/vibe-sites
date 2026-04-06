import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { NavBar } from "./components/echo/nav-bar";
import { HeroSection } from "./components/echo/hero-section";
import { FeaturesSection } from "./components/echo/features-section";
import { PlayerSection } from "./components/echo/player-section";
import { PricingSection } from "./components/echo/pricing-section";
import { TestimonialsSection } from "./components/echo/testimonials-section";
import { CTABannerSection } from "./components/echo/cta-banner-section";
import { SiteFooter } from "./components/echo/site-footer";
import { FloatingCTA } from "./components/echo/floating-cta";

function App() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <PlayerSection />
      <PricingSection />
      <TestimonialsSection />
      <CTABannerSection />
      <SiteFooter />
      <FloatingCTA />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
