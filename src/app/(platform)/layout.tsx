import { PlatformSidebar } from "@/components/layout/PlatformSidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="verse-container py-8 md:py-12 pt-24 md:pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <PlatformSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
