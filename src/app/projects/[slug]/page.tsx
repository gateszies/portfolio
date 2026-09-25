import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MarkdownBody } from "@/components/MarkdownBody";
import { Badge } from "@/components/Badge";
import { getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getAllProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pt-12 pb-12">
      <Breadcrumb href="/#work" label="back to projects" />

      <h1 className="font-display text-foreground text-6xl">{project.title}</h1>

      <ul className="flex flex-wrap gap-2.5">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge size="sm">{tag}</Badge>
          </li>
        ))}
      </ul>

      <Image
        src={project.hero}
        alt=""
        width={1082}
        height={572}
        className="border-strong w-full rounded-lg border"
      />

      <MarkdownBody html={project.bodyHtml} />
    </div>
  );
}
