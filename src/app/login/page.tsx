"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FantasyScene } from "@/components/animations/FantasyScene";

export default function LoginPage() {
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
            <h1 className="verse-heading text-2xl mb-2">Welcome Back</h1>
            <p className="text-ivory-muted text-sm font-sans">Return to your stories</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="Email" type="email" placeholder="you@example.com" required />
            <Input label="Password" type="password" placeholder="••••••••" required />
            <div className="flex items-center justify-between text-sm font-sans">
              <label className="flex items-center gap-2 text-ivory-muted cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button type="button" className="text-champagne hover:text-champagne-light transition-colors">
                Forgot password?
              </button>
            </div>
            <Button variant="primary" size="lg" className="w-full rounded-xl">Sign In</Button>
          </form>

          <p className="text-center text-sm font-sans text-ivory-dim mt-8">
            New to the tribe?{" "}
            <Link href="/register" className="text-champagne hover:text-champagne-light">Create an account</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
