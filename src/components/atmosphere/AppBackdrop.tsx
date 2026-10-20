"use client";

/**
 * Fixed ambient layer — decorative only (pointer-events-none, aria-hidden).
 */
export function AppBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 groove-grid opacity-[0.35]" />
      <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] max-w-[720px] rounded-full bg-accent-violet/20 blur-[100px] animate-float-slow" />
      <div className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-accent-cyan/15 blur-[90px] animate-float" />
      <div className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-accent-fuchsia/10 blur-[100px] animate-drift" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-transparent to-navy-deep" />
    </div>
  );
}
