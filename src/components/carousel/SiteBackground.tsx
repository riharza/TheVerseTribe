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
        className="forest-leaf forest-leaf-a absolute -left-[8%] top-[6%] h-[38vh] w-[45vw] opacity-35"
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
        className="forest-leaf forest-leaf-b absolute -right-[5%] top-[12%] h-[32vh] w-[40vw] rotate-12 opacity-25"
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
        className="forest-leaf forest-leaf-c absolute bottom-[8%] left-[20%] h-[28vh] w-[35vw] -rotate-45 opacity-20"
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
