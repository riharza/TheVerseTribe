import { LabSpinner } from "@/components/ui/LabSpinner";

export default function Loading() {
  return (
    <div className="verse-container py-32 flex items-center justify-center min-h-[50vh]">
      <LabSpinner label="Loading research workspace…" />
    </div>
  );
}
