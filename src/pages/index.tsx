import { useEffect, useState } from "react";
import LandingHero from "@/components/HeroSection";
import IntroOverlay from "@/components/IntroOverlay";
import AboutServicesSection from "@/components/AboutServicesSection"; 
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  const [ready, setReady] = useState<boolean | null>(null);

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
      </div>
    </>
  );
}
