import { describe, expect, it } from "vitest";
import { getAllProjects } from "./projects";

describe("getAllProjects", () => {
  it("reads every markdown file in content/projects", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it("parses frontmatter and renders the body to HTML", () => {
    const project = getAllProjects().find(
      (p) => p.slug === "prodpi-site-migration",
    );

    expect(project).toBeDefined();
    expect(project?.title).toBe("ProDPI Site Migration");
    expect(project?.tags).toContain("Typescript");
    expect(project?.bodyHtml).toContain("<p>");
  });
});
