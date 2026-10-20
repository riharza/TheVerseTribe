import { describe, expect, it } from "vitest";
import { filterPapers, getPaperById } from "./index";

describe("filterPapers", () => {
  it("returns all papers when query is empty", () => {
    expect(filterPapers({}).length).toBeGreaterThan(0);
  });

  it("matches title case-insensitively", () => {
    const results = filterPapers({ query: "attention" });
    expect(results.some((p) => p.id === "paper-attention-2017")).toBe(true);
  });

  it("filters by status", () => {
    const reviewed = filterPapers({ status: "reviewed" });
    expect(reviewed.every((p) => p.status === "reviewed")).toBe(true);
  });

  it("filters by project id", () => {
    const results = filterPapers({ projectId: "proj-evidence-assistant" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.projectIds.includes("proj-evidence-assistant"))).toBe(true);
  });
});

describe("getPaperById", () => {
  it("returns undefined for unknown id", () => {
    expect(getPaperById("missing")).toBeUndefined();
  });
});
