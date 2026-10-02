import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectMetadata = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  hero: string;
  draft?: boolean;
};

export type Project = ProjectMetadata & {
  slug: string;
  Content: ComponentType;
};

type ProjectModule = {
  default: ComponentType;
  project: ProjectMetadata;
};

/** Reads every content/projects/*.mdx file — add a project by adding a file, no code changes needed. */
export async function getAllProjects(): Promise<Project[]> {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(
    files.map((file) => getProject(file.replace(/\.mdx$/, ""))),
  );

  return projects.filter((project) => !project.draft);
}

export async function getProject(slug: string): Promise<Project> {
  const mod = (await import(`@content/projects/${slug}.mdx`)) as ProjectModule;

  return {
    slug,
    ...mod.project,
    Content: mod.default,
  };
}
