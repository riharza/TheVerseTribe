"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, UserPlus, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

function ParticleBurst({ color }: { color: string }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ background: color, left: "50%", top: "50%" }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos((i / 6) * Math.PI * 2) * 20,
            y: Math.sin((i / 6) * Math.PI * 2) * 20,
            scale: 0,
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </>
  );
}

export function LikeButton({ count, className }: { count?: number; className?: string }) {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setLiked(!liked);
        if (!liked) {
          setBurst(true);
          setTimeout(() => setBurst(false), 600);
        }
      }}
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-sans transition-colors",
        liked ? "text-peach bg-peach/10" : "text-ivory-muted hover:text-champagne hover:bg-champagne/5",
        className
      )}
    >
      {burst && <ParticleBurst color="#e8a87c" />}
      <Heart className={cn("w-4 h-4", liked && "fill-peach")} />
      {count !== undefined && <span>{liked ? count + 1 : count}</span>}
    </button>
  );
}

export function BookmarkButton({ className }: { className?: string }) {
  const [saved, setSaved] = useState(false);
  const [flying, setFlying] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setSaved(!saved);
        if (!saved) {
          setFlying(true);
          setTimeout(() => setFlying(false), 700);
        }
      }}
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-sans transition-colors",
        saved ? "text-magic-cyan bg-magic-cyan/10" : "text-ivory-muted hover:text-champagne hover:bg-champagne/5",
        className
      )}
    >
      <AnimatePresence>
        {flying && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -24, opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Bookmark className="w-4 h-4 text-magic-cyan fill-magic-cyan" />
          </motion.span>
        )}
      </AnimatePresence>
      <Bookmark className={cn("w-4 h-4", saved && "fill-magic-cyan text-magic-cyan")} />
      {saved ? "Saved" : "Bookmark"}
    </button>
  );
}

export function FollowButton({ name, className }: { name: string; className?: string }) {
  const [following, setFollowing] = useState(false);
  const [connected, setConnected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setFollowing(!following);
        if (!following) {
          setConnected(true);
          setTimeout(() => setConnected(false), 800);
        }
      }}
      className={cn(
        "relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-sans border transition-all",
        following
          ? "border-champagne/30 text-champagne bg-champagne/10"
          : "border-champagne/40 text-champagne hover:bg-champagne/10",
        className
      )}
    >
      {connected && (
        <motion.span
          className="absolute inset-0 rounded-xl border border-magic-cyan/50 pointer-events-none"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      <UserPlus className="w-4 h-4" />
      {following ? "Following" : `Follow ${name.split(" ")[0]}`}
    </button>
  );
}

export function ShareButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(window.location.href)}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-sans text-ivory-muted hover:text-champagne hover:bg-champagne/5 transition-colors",
        className
      )}
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
