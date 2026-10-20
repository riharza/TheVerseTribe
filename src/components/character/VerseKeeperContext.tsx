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

export type KeeperMood =
  | "welcome"
  | "explore"
  | "read"
  | "write"
  | "guard"
  | "reflect"
  | "listen"
  | "search"
  | "invite"
  | "idle";

interface VerseKeeperContextValue {
  mood: KeeperMood;
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
  isVisible: boolean;
}

const VerseKeeperContext = createContext<VerseKeeperContextValue | null>(null);

function moodFromPath(pathname: string): KeeperMood {
  if (pathname === "/") return "welcome";
  if (pathname.startsWith("/discover")) return "explore";
  if (pathname.includes("/chapter/")) return "read";
  if (pathname.startsWith("/write")) return "write";
  if (pathname.startsWith("/library")) return "guard";
  if (pathname.startsWith("/blog")) return "reflect";
  if (pathname.startsWith("/forum")) return "listen";
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) return "invite";
  if (pathname.startsWith("/writers/")) return "reflect";
  if (pathname.startsWith("/story/")) return "read";
  return "idle";
}

function shouldHideKeeper(pathname: string): boolean {
  return pathname.includes("/chapter/") || pathname.startsWith("/login") || pathname.startsWith("/register");
}

export function VerseKeeperProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setHovered] = useState(false);

  const mood = useMemo(() => moodFromPath(pathname), [pathname]);
  const isVisible = !shouldHideKeeper(pathname);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX / window.innerWidth);
    setMouseY(e.clientY / window.innerHeight);
  }, []);

  const handleScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  const value = useMemo(
    () => ({
      mood,
      mouseX,
      mouseY,
      scrollProgress,
      isHovered,
      setHovered,
      isVisible,
    }),
    [mood, mouseX, mouseY, scrollProgress, isHovered, isVisible]
  );

  return (
    <VerseKeeperContext.Provider value={value}>
      {children}
    </VerseKeeperContext.Provider>
  );
}

export function useVerseKeeper() {
  const ctx = useContext(VerseKeeperContext);
  if (!ctx) {
    throw new Error("useVerseKeeper must be used within VerseKeeperProvider");
  }
  return ctx;
}

export function useVerseKeeperSafe() {
  return useContext(VerseKeeperContext);
}
