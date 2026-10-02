import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { RichText } from "@/components/RichText";
import { getAllProjects, getProject } from "@/lib/projects";

const accentColors = ["accentOne", "accentTwo", "accentThree"] as const;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  const hideDraft =
    project.draft === true && process.env.NODE_ENV === "production";
  if (hideDraft) {
    notFound();
  }

  const { Content } = project;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pt-16 pb-24">
      <h1 className="font-display text-6xl">{project.title}</h1>

      <ul className="flex flex-wrap gap-2.5">
        {project.tags.map((tag, i) => (
          <li key={tag}>
            <Badge size="sm" color={accentColors[i % accentColors.length]}>
              {tag}
            </Badge>
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

      <RichText className="prose prose-lg max-w-none pt-4">
        <Content />
      </RichText>
    </div>
  );
}
