import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

describe("project MDX content", () => {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  it("has at least one case study", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("exports metadata from every project file", () => {
    for (const file of files) {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
      expect(raw, file).toMatch(/export const project = \{/);
      expect(raw, file).toMatch(/\btitle:/);
      expect(raw, file).toMatch(/\bdescription:/);
      expect(raw, file).toMatch(/\btags:/);
      expect(raw, file).toMatch(/\bthumbnail:/);
      expect(raw, file).toMatch(/\bhero:/);
    }
  });
});
