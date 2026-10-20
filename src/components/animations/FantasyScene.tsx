"use client";



import { FantasyRealmBackground } from "./FantasyRealmBackground";



interface FantasySceneProps {

  variant?: "hero" | "ambient";

  className?: string;

}



/** Lightweight wrapper — uses the cinematic realm photograph + magical overlays */

export function FantasyScene({ variant = "hero", className }: FantasySceneProps) {

  return (

    <FantasyRealmBackground

      variant={variant === "ambient" ? "ambient" : "hero"}

      className={className}

    />

  );

}

