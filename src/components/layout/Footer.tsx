"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";

const footerLinks = {
  Platform: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/literature", label: "Literature explorer" },
    { href: "/assistant", label: "AI assistant" },
  ],
  Tools: [
    { href: "/analysis", label: "Research analysis" },
    { href: "/experiments", label: "Experiment lab" },
    { href: "/docs", label: "Documentation" },
  ],
  Project: [
    { href: "/about", label: "About" },
    { href: "/docs#setup", label: "Local setup" },
  ],
};

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative border-t border-accent-violet/15 mt-auto bg-navy-deep/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
      <div className="verse-container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-5" compact />
            <p className="text-ivory-dim text-sm font-sans leading-relaxed max-w-xs">
              Scientific literature management, evidence-grounded AI, and reproducible experiment
              tracking — built for research teams.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="verse-subheading mb-4 text-accent-violet-soft/80">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-ivory-dim hover:text-accent-cyan transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="verse-divider my-10" />
        <p className="text-center text-xs text-ivory-dim/70 font-sans">
          Sample data only · {pathname.startsWith("/story") ? "Legacy story routes retained in codebase" : "Backend not connected"}
        </p>
      </div>
    </footer>
  );
}
