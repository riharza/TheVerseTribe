# Backend services (planned)

Python **FastAPI** service for:

- PDF upload and text extraction
- Embeddings + pgvector retrieval
- LLM orchestration with citation grounding
- PostgreSQL persistence for papers, projects, experiments

The frontend API contract lives in `src/lib/api/contract.ts`. The typed client is `src/lib/api/client.ts`.

Implementation will be added in a later milestone without changing route URLs in the Next.js app.
