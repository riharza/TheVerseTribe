"use client";

import { usePathname } from "next/navigation";
import { useCharacterSafe } from "./CharacterContext";
import { Wanderer } from "./Wanderer";
import { Scribe } from "./Scribe";
import { Guardian } from "./Guardian";

const HIDDEN = ["/", "/chapter/", "/login", "/register", "/story/"];

export function SectionCharacter() {
  const pathname = usePathname();
  const ctx = useCharacterSafe();

  if (!ctx?.isVisible) return null;
  if (HIDDEN.some((r) => (r === "/" ? pathname === "/" : pathname.includes(r)))) return null;

  const { role } = ctx;

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true">
      {role === "wanderer" && <Wanderer />}
      {role === "scribe" && <Scribe writing />}
      {role === "guardian" && <Guardian gateOpen={pathname.startsWith("/community") || pathname.startsWith("/forum")} />}
    </div>
  );
}
