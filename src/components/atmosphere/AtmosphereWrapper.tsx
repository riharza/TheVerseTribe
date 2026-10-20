"use client";

import { usePathname } from "next/navigation";
import { Starfield } from "./Starfield";
import { MistLayer } from "./MistLayer";

const MINIMAL_ROUTES = [
  "/story/",
  "/login",
  "/register",
];

interface AtmosphereWrapperProps {
  children: React.ReactNode;
}

export function AtmosphereWrapper({ children }: AtmosphereWrapperProps) {
  const pathname = usePathname();
  const isMinimal = MINIMAL_ROUTES.some((route) => pathname.includes(route));
  const isHome = pathname === "/";

  if (isMinimal) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-verse-radial opacity-60" />
        <Starfield density={isHome ? 80 : 40} />
        <MistLayer intensity={isHome ? "high" : "low"} />
        <div className="absolute inset-0 atmospheric-vignette" />
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
