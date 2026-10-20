"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";

export type CharacterRole = "storyteller" | "wanderer" | "scribe" | "guardian" | "none";

interface CharacterContextValue {
  role: CharacterRole;
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  isVisible: boolean;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

function roleFromPath(pathname: string): CharacterRole {
  if (pathname === "/") return "storyteller";
  if (pathname.startsWith("/discover") || pathname.startsWith("/explore") || pathname.startsWith("/search")) return "wanderer";
  if (pathname.startsWith("/write")) return "scribe";
  if (pathname.startsWith("/community") || pathname.startsWith("/forum")) return "guardian";
  if (pathname.includes("/chapter/")) return "none";
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) return "none";
  return "storyteller";
}

const HIDDEN = ["/chapter/", "/login", "/register"];

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [scrollProgress, setScrollProgress] = useState(0);

  const role = useMemo(() => roleFromPath(pathname), [pathname]);
  const isVisible = !HIDDEN.some((r) => pathname.includes(r));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };
    const onScroll = () => {
      const d = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(d > 0 ? window.scrollY / d : 0);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const value = useMemo(
    () => ({ role, mouseX, mouseY, scrollProgress, isVisible }),
    [role, mouseX, mouseY, scrollProgress, isVisible]
  );

  return (
    <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error("useCharacter requires CharacterProvider");
  return ctx;
}

export function useCharacterSafe() {
  return useContext(CharacterContext);
}
