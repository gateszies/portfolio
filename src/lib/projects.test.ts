import { describe, expect, it } from "vitest";
import { getAllProjects } from "./projects";

describe("getAllProjects", () => {
  it("reads every markdown file in content/projects", async () => {
    const projects = await getAllProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it("parses frontmatter and renders the body to HTML", async () => {
    const projects = await getAllProjects();
    const project = projects.find((p) => p.slug === "prodpi-site-migration");

    expect(project).toBeDefined();
    expect(project?.title).toBe("ProDPI Site Migration");
    expect(project?.tags).toContain("TypeScript");
    expect(project?.bodyHtml).toContain("<p>");
  });
});
