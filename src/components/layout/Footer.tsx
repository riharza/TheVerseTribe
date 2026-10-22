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

  if (pathname === "/") return null;

  return (
    <footer className="relative mt-auto border-t border-slate-200 bg-white/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
      <div className="verse-container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-5" compact />
            <p className="max-w-xs text-sm font-sans leading-relaxed text-slate-600">
              Scientific literature management, evidence-grounded AI, and reproducible experiment
              tracking — built for research teams.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="verse-subheading mb-4 text-slate-500">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-slate-600 transition-colors hover:text-slate-900"
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
        <p className="text-center text-xs font-sans text-slate-500">
          Sample data only · {pathname.startsWith("/story") ? "Legacy story routes retained in codebase" : "Backend not connected"}
        </p>
      </div>
    </footer>
  );
}
