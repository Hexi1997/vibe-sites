import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { ApiSection } from "./components/ogx-claude/api-section";
import { CtaBannerSection } from "./components/ogx-claude/cta-banner-section";
import { DemoSection } from "./components/ogx-claude/demo-section";
import { FeaturesSection } from "./components/ogx-claude/features-section";
import { FooterSection } from "./components/ogx-claude/footer-section";
import { HeroSection } from "./components/ogx-claude/hero-section";
import { NavBar } from "./components/ogx-claude/nav-bar";
import { PricingSection } from "./components/ogx-claude/pricing-section";
import { TemplatesSection } from "./components/ogx-claude/templates-section";
import { UseCasesSection } from "./components/ogx-claude/use-cases-section";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <DemoSection />
        <TemplatesSection />
        <FeaturesSection />
        <UseCasesSection />
        <ApiSection />
        <PricingSection />
        <CtaBannerSection />
      </main>
      <FooterSection />
    </>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
