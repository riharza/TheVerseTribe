"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FairyCharacter } from "./FairyCharacter";
import { useVerseKeeperSafe } from "./VerseKeeperContext";

const COMPANION_ROUTES = [
  "/discover",
  "/write",
  "/library",
  "/blog",
  "/forum",
  "/search",
];

export function VerseKeeperCompanion() {
  const pathname = usePathname();
  const ctx = useVerseKeeperSafe();

  if (
    !ctx?.isVisible ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return null;
  }

  const showCompanion = COMPANION_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!showCompanion) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 hidden lg:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.7, y: 0 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      <FairyCharacter variant="lumen" size="companion" />
    </motion.div>
  );
}
