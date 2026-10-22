"use client";

export function AmbientLightBackground() {
  return (
    <div className="ambient-light-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="ambient-light-orb ambient-light-orb-a" />
      <div className="ambient-light-orb ambient-light-orb-b" />
      <div className="ambient-light-orb ambient-light-orb-c" />
    </div>
  );
}
