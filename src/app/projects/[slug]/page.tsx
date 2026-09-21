import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pb-24 pt-12">
      <Link
        href="/#work"
        className="text-body-md fgColor-secondary transition hover:fgColor-accent"
      >
        &larr; back to projects
      </Link>

      <h1 className="font-display text-display-sm fgColor-primary">
        {project.title}
      </h1>

      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bgColor-secondary px-3 py-1 text-body-sm fgColor-secondary"
          >
            {tag}
          </li>
        ))}
      </ul>

      <Image
        src={project.hero}
        alt=""
        width={1082}
        height={572}
        className="w-full rounded-xl bgColor-secondary object-cover"
      />

      <div className="flex flex-col gap-4 whitespace-pre-line text-body-lg fgColor-secondary">
        {project.body}
      </div>

      <footer className="text-body-sm fgColor-secondary">
        Designed in Figma and coded with Next.js by me.{" "}
        <Link href="/" className="underline decoration-dotted underline-offset-4">
          back home
        </Link>
      </footer>
    </div>
  );
}
