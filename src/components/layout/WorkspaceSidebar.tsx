"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  BookOpen,
  FlaskConical,
  GitCompare,
  LayoutDashboard,
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/workspace", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/literature", label: "Paper library", icon: Library },
  { href: "/assistant", label: "AI assistant", icon: Bot },
  { href: "/analysis", label: "Analysis", icon: GitCompare },
  { href: "/experiments", label: "Experiments", icon: FlaskConical },
  { href: "/docs", label: "Documentation", icon: BookOpen },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  return (
    <nav className="verse-panel p-3 md:p-4 sticky top-24 groove-panel" aria-label="Workspace">
      <p className="verse-subheading text-accent-cyan/80 mb-3 px-3">Workspace</p>
      <ul className="space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-xl text-sm font-sans transition-colors",
                  active
                    ? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25 shadow-neon-cyan/10"
                    : "text-ivory-muted hover:text-ivory hover:bg-white/5 border border-transparent"
                )}
              >
                {active && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-accent-cyan to-accent-fuchsia"
                    aria-hidden
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
