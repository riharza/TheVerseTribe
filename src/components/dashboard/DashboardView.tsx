import {
  SAMPLE_ACTIVITY,
  SAMPLE_PROJECTS,
  getRecentPapers,
  getWorkspaceStats,
} from "@/lib/data/sample";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { StatCard } from "@/components/research/StatCard";
import { PaperCard } from "@/components/research/PaperCard";
import { ProjectCard } from "@/components/research/ProjectCard";
import { ActivityTimeline } from "@/components/research/ActivityTimeline";
import { MockBanner } from "@/components/ui/MockBanner";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";
import { BookOpen, Bot, FlaskConical, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardView() {
  const stats = getWorkspaceStats();
  const recentPapers = getRecentPapers(4);
  const projects = SAMPLE_PROJECTS.slice(0, 4);
  const activity = SAMPLE_ACTIVITY.slice(0, 5);

  return (
    <div className="space-y-8">
      <MockBanner feature="Dashboard metrics and library counts" />

      <FadeIn>
        <header>
          <p className="verse-subheading text-accent-cyan/80 mb-2">Dashboard</p>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ivory mb-2 tracking-tight">
            Research overview
          </h1>
          <p className="text-ivory-muted font-sans text-sm max-w-2xl">
            Projects, recent papers, and activity across your workspace.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Papers in library" value={stats.papersTotal} icon={BookOpen} />
          <StatCard label="Active projects" value={stats.projectsActive} icon={FolderKanban} />
          <StatCard label="Experiments (30d)" value={stats.experimentsThisMonth} icon={FlaskConical} hint="Sample" />
          <StatCard label="Assistant sessions" value={stats.assistantSessions} icon={Bot} hint="Preview" />
        </div>
      </FadeIn>

      <section>
        <SectionHeader
          title="Recent papers"
          action={
            <Link href="/literature">
              <Button variant="ghost" size="sm">
                Open library
              </Button>
            </Link>
          }
        />
        <div className="grid md:grid-cols-2 gap-4">
          {recentPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} variant="compact" />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Projects" />
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Recent activity" />
        <ActivityTimeline items={activity} />
      </section>
    </div>
  );
}
