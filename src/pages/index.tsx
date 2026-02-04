import { useEffect, useState } from "react";
import LandingHero from "@/components/HeroSection";
import IntroOverlay from "@/components/IntroOverlay";
import AboutServicesSection from "@/components/AboutServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/testimonial";
import CTAInnovationSection from "@/components/CTAInnovationSection";
import ServicesGrid from "@/components/Services";

export default function Home() {
  const [ready, setReady] = useState<boolean | null>(null);

  const A1 = [
    "/assets/services.webp",
    "/assets/services.webp",
  ];

  const A2 = [
    "/assets/services.webp",
    "/assets/services.webp",
  ];

  useEffect(() => {
    const done = sessionStorage.getItem("vv_intro_done") === "1";
    setReady(done);
  }, []);

  const finish = () => {
    sessionStorage.setItem("vv_intro_done", "1");
    setReady(true);
  };

  if (ready === null) return null;

  return (
    <>
      {!ready && <IntroOverlay onFinish={finish} />}

      <div
        className={`transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <LandingHero />
        <AboutServicesSection />
        <PortfolioSection />
        <ServicesGrid
          topLeftA={A1}
          topLeftB={A2}
          bottomRightA={A2}
          bottomRightB={A1}
        />
        <TestimonialsSection />
        <CTAInnovationSection />
      </div>
    </>
  );
}
