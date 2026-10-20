import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="verse-container py-32 text-center">
      <p className="verse-subheading text-accent-violet-soft mb-4">404</p>
      <h1 className="font-display font-semibold text-5xl md:text-6xl text-ivory mb-4">Not found</h1>
      <p className="text-ivory-muted font-sans mb-8 max-w-md mx-auto">
        This route is not part of the research platform, or the page was moved.
      </p>
      <Link href="/">
        <Button variant="primary">Return home</Button>
      </Link>
    </div>
  );
}
