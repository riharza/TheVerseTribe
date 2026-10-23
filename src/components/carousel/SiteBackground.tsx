"use client";

/** Forest canopy backdrop — gradient, leaf silhouettes, organic depth. */
export function SiteBackground() {
  return (
    <div className="site-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="forest-base-gradient absolute inset-0" />
      <div className="forest-canopy-glow absolute inset-0" />
      <div className="forest-terracotta-band absolute inset-x-0 top-0 h-[34vh] opacity-95" />
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] opacity-70"
        style={{
          background:
            "linear-gradient(to top, rgba(74, 51, 40, 0.55) 0%, rgba(92, 64, 51, 0.2) 45%, transparent 100%)",
        }}
        aria-hidden
      />

      <svg
        className="forest-leaf forest-leaf-a absolute -left-[12%] top-[6%] h-[28vh] w-[55vw] opacity-25 sm:-left-[8%] sm:h-[38vh] sm:w-[45vw] sm:opacity-35"
        viewBox="0 0 200 280"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 20 C40 80 20 160 100 260 C180 160 160 80 100 20 Z"
          fill="currentColor"
          className="text-[var(--forest-mint)]"
        />
        <path d="M100 40 L100 240" stroke="rgba(218,241,222,0.15)" strokeWidth="2" />
      </svg>
      <svg
        className="forest-leaf forest-leaf-b absolute -right-[8%] top-[10%] h-[24vh] w-[48vw] rotate-12 opacity-20 sm:-right-[5%] sm:top-[12%] sm:h-[32vh] sm:w-[40vw] sm:opacity-25"
        viewBox="0 0 200 280"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 20 C40 80 20 160 100 260 C180 160 160 80 100 20 Z"
          fill="currentColor"
          className="text-[var(--forest-earth)]"
        />
      </svg>
      <svg
        className="forest-leaf forest-leaf-c absolute bottom-[6%] left-[10%] hidden h-[22vh] w-[40vw] -rotate-45 opacity-15 sm:block sm:bottom-[8%] sm:left-[20%] sm:h-[28vh] sm:w-[35vw] sm:opacity-20"
        viewBox="0 0 200 280"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 20 C40 80 20 160 100 260 C180 160 160 80 100 20 Z"
          fill="currentColor"
          className="text-[var(--forest-sage)]"
        />
      </svg>

      <div className="forest-vein-texture absolute inset-0" />
      <div className="site-backdrop-particles absolute inset-0 opacity-60" />
      <div className="forest-vignette absolute inset-0" />
    </div>
  );
}
