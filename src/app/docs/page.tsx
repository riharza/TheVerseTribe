import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { fetchHealth, USE_MOCK_API } from "@/lib/api/client";

export const metadata = {
  title: "Documentation",
};

export default async function DocsPage() {
  const health = await fetchHealth();

  return (
    <div className="verse-container max-w-3xl py-6 pb-10 pt-[max(5.5rem,env(safe-area-inset-top))] sm:py-8 md:py-12 md:pt-28">
      <SectionHeader
        eyebrow="Documentation"
        title="Platform documentation"
        description="Capabilities, architecture, environment variables, and backend roadmap."
      />

      <div className="verse-panel p-6 mb-8 font-mono text-xs text-ivory-muted space-y-1">
        <p>
          API mode:{" "}
          <span className="text-accent-cyan">{USE_MOCK_API ? "mock (local demo)" : "live"}</span>
        </p>
        <p>
          Health: <span className="text-accent-cyan">{health.status}</span> — DB{" "}
          {health.services.database ? "on" : "off"}, embeddings{" "}
          {health.services.embeddings ? "on" : "off"}, LLM{" "}
          {health.services.llm ? "on" : "off"}
        </p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none font-sans prose-headings:font-display prose-a:text-accent-cyan">
        <h2 id="capabilities">Capabilities</h2>
        <ul>
          <li>Literature library with search, status filters, and project scoping</li>
          <li>AI assistant UI with paper selection and source excerpts</li>
          <li>Structured analysis comparison and CSV export</li>
          <li>Experiment run registry and sample metric charts</li>
        </ul>

        <h2 id="stack">Architecture</h2>
        <ul>
          <li>
            <strong>Frontend:</strong> this Next.js app
          </li>
          <li>
            <strong>API contract:</strong> <code>src/lib/api/contract.ts</code>
          </li>
          <li>
            <strong>Client:</strong> <code>src/lib/api/client.ts</code> (mock or HTTP)
          </li>
          <li>
            <strong>Backend (planned):</strong> FastAPI + PostgreSQL + pgvector in{" "}
            <code>services/</code>
          </li>
        </ul>

        <h2 id="setup">Local setup</h2>
        <pre className="font-mono text-xs bg-navy-mid/80 p-4 rounded-xl border border-white/10 overflow-x-auto">
{`npm install
npm run dev`}
        </pre>

        <h2 id="env">Environment</h2>
        <p>
          Copy <code>.env.example</code> to <code>.env.local</code>:
        </p>
        <ul>
          <li>
            <code>NEXT_PUBLIC_USE_MOCK_API=true</code> — default; no backend required
          </li>
          <li>
            <code>NEXT_PUBLIC_API_URL</code> — FastAPI base URL when ready
          </li>
        </ul>

        <h2 id="sample-data">Sample data</h2>
        <p>
          All demo papers and metrics live under <code>src/lib/data/sample/</code>. They are not
          production bibliographic records.
        </p>

        <p>
          <Link href="/about">About</Link> · <Link href="/dashboard">Dashboard</Link>
        </p>
      </div>
    </div>
  );
}
