"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { FantasyRealmBackground } from "./FantasyRealmBackground";
import { ScrollEvolutionCharacter } from "@/components/characters/ScrollEvolutionCharacter";

interface HomeScrollJourneyProps {
  children: React.ReactNode;
}

export function HomeScrollJourney({ children }: HomeScrollJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed cinematic background — visible through glass sections */}
      <div className="fixed inset-0 z-0">
        <FantasyRealmBackground scrollProgress={scrollYProgress} variant="full" />
      </div>

      {/* Character evolves as you scroll the homepage */}
      <ScrollEvolutionCharacter progress={scrollYProgress} />

      {/* Page content floats above the realm */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
