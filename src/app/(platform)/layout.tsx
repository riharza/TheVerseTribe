import { PlatformSidebar } from "@/components/layout/PlatformSidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="verse-container py-6 pb-10 pt-[max(5.5rem,env(safe-area-inset-top))] sm:py-8 md:py-12 md:pt-28">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
        <PlatformSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
