# The Verse Tribe

AI-powered **research software** for organizing scientific papers, searching literature, analyzing findings, and managing projects and experiments.

**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion.  
**Backend (planned):** FastAPI, PostgreSQL, pgvector — see [`services/README.md`](services/README.md).

---

## Run locally

```bash
cd the-verse-tribe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If the app hangs or shows a blank page after crashes:

```bash
npm run dev:clean
```

Run **only one** dev server at a time (do not run `npm run build` while `dev` is active).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (stop dev first) |
| `npm start` | Serve production build |
| `npm test` | Unit tests (sample data helpers) |
| `npm run lint` | ESLint |

Copy [`.env.example`](.env.example) to `.env.local` if you need to override mock API behavior. **Do not commit `.env.local` or any API keys.**

All demo content lives under `src/lib/data/sample/` — fictional or public bibliographic examples only; no user data is stored in this repository.

### Pre-deploy check

```bash
npm run check
```

Runs tests, ESLint, and production build (same steps CI/hosting should use).

---

## Deploy (e.g. Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) — framework **Next.js** (auto-detected).
3. **Build command:** `npm run build` · **Install:** `npm install` · **Output:** default.
4. **Environment variables** (optional for demo):
   - `NEXT_PUBLIC_USE_MOCK_API=true` (default behavior if unset)
   - `NEXT_PUBLIC_API_URL` when FastAPI is live
5. Add your custom domain under **Project → Settings → Domains** and set DNS per Vercel’s instructions.

Do not run `npm run dev` on the hosting platform; use the production build only.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — forest-themed carousel of research modules |
| `/dashboard` | Research dashboard (projects, papers, activity) |
| `/literature` | Library — upload UI, search, filters |
| `/assistant` | AI assistant — Q&A with sample citations |
| `/analysis` | Methods/findings comparison table + CSV export |
| `/experiments` | Experiment runs and metric charts |
| `/docs` | Documentation and setup |
| `/about` | About the platform |
| `/workspace` | Redirects to `/dashboard` |

---

## What works today vs. backend

| Feature | Status |
|---------|--------|
| Navigation, layout, responsive UI | **Functional** |
| Dashboard, projects, activity | **Sample data** (`src/lib/data/sample/`) |
| Literature search & filters | **Functional** on sample JSON |
| PDF upload | **Client validation only** — no server storage |
| AI assistant | **Mock** via `queryAssistant()` — sample passages, simulated delay |
| Research analysis table | **Sample rows** — CSV export works in browser |
| Experiment lab | **Sample runs** — no execution pipeline |
| Auth, PostgreSQL, FastAPI, real LLM | **Not implemented** |

Mock mode is controlled by `NEXT_PUBLIC_USE_MOCK_API` (default `true`). Set to `false` and `NEXT_PUBLIC_API_URL` when the API exists.

---

## Project structure

```
src/
├── app/
│   ├── (platform)/     # Dashboard + tools (shared sidebar)
│   ├── page.tsx        # Home
│   ├── docs/, about/
│   └── ...
├── components/
│   ├── assistant/
│   ├── analysis/
│   ├── dashboard/
│   ├── experiments/
│   ├── literature/
│   ├── research/       # Cards, stats, badges
│   └── ui/
├── lib/
│   ├── api/            # contract.ts, client.ts
│   └── data/sample/    # Demo datasets only
└── types/research.ts
```

---

## Public repository notes

- No secrets belong in git — use Vercel/hosting env vars for `NEXT_PUBLIC_*` when you add a real API.
- PDF upload and assistant responses are **mock/client-only** in this build; nothing is persisted to a server from the demo UI.

## License

MIT — see [LICENSE](LICENSE).
