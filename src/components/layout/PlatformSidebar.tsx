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
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/literature", label: "Literature", icon: Library },
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/analysis", label: "Analysis", icon: GitCompare },
  { href: "/experiments", label: "Experiments", icon: FlaskConical },
  { href: "/docs", label: "Docs", icon: BookOpen },
];

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="verse-panel groove-panel p-2 sm:p-3 md:p-4 lg:sticky lg:top-24"
      aria-label="Platform"
    >
      <p className="verse-subheading mb-2 hidden px-3 text-accent-cyan/80 sm:mb-3 lg:block">
        Research tools
      </p>
      <ul
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:space-y-1 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href} className="shrink-0 lg:shrink lg:w-full">
              <Link
                href={href}
                className={cn(
                  "relative flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm font-sans transition-colors min-h-[44px] lg:gap-3 lg:py-3",
                  active
                    ? "border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan"
                    : "border-transparent text-ivory-muted hover:bg-white/5 hover:text-ivory"
                )}
              >
                {active && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-fuchsia lg:bottom-2 lg:left-0 lg:right-auto lg:top-2 lg:h-auto lg:w-0.5"
                    aria-hidden
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="pr-0.5 lg:pr-0">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
