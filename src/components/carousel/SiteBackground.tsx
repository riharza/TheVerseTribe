"use client";

/** Animated light ambient backdrop for all pages. */
export function SiteBackground() {
  return (
    <div className="site-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="ambient-light-bg absolute inset-0" />
      <div className="ambient-gradient-shift absolute inset-0 opacity-70" />
      <div className="ambient-light-orb ambient-light-orb-a" />
      <div className="ambient-light-orb ambient-light-orb-b" />
      <div className="ambient-light-orb ambient-light-orb-c" />
      <div className="ambient-light-orb ambient-light-orb-d" />
      <div className="site-backdrop-grid absolute inset-0" />
      <div className="site-backdrop-grid site-backdrop-grid-drift absolute inset-0" />
      <div className="site-backdrop-particles absolute inset-0" />
      <div className="site-backdrop-vignette absolute inset-0" />
    </div>
  );
}
