"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FantasyScene } from "@/components/animations/FantasyScene";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FantasyScene variant="ambient" />
        <div className="absolute inset-0 bg-navy-deep/70" />
      </div>

      <FadeIn className="relative w-full max-w-md mx-4">
        <div className="verse-panel p-8 md:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <BookOpen className="w-6 h-6 text-champagne" />
              <span className="font-display text-sm text-champagne tracking-widest">THE VERSE TRIBE</span>
            </Link>
            <h1 className="verse-heading text-2xl mb-2">Join the Tribe</h1>
            <p className="text-ivory-muted text-sm font-sans italic">&ldquo;Every story creates a new world.&rdquo;</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="Display Name" type="text" placeholder="Your pen name" required />
            <Input label="Email" type="email" placeholder="you@example.com" required />
            <Input label="Username" type="text" placeholder="your-username" required />
            <Input label="Password" type="password" placeholder="••••••••" required />
            <Button variant="primary" size="lg" className="w-full rounded-xl">Create Account</Button>
          </form>

          <p className="text-center text-sm font-sans text-ivory-dim mt-8">
            Already a member?{" "}
            <Link href="/login" className="text-champagne hover:text-champagne-light">Sign in</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
