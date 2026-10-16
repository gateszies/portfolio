import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { ProjectSpecItem } from "@/components/ProjectSpecItem";
import { ProjectSpecList } from "@/components/ProjectSpecList";
import { RichText } from "@/components/RichText";
import { TextLink } from "@/components/TextLink";
import { PROJECT_MEDIA_HEIGHT, PROJECT_MEDIA_WIDTH } from "@/lib/project-media";
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
  const specs = project.specs;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pt-16 pb-12 sm:pb-24">
      <TextLink
        href="/#work"
        tone="chrome"
        className="font-label inline-flex items-center gap-1.5 self-start text-sm font-medium tracking-widest"
      >
        <Icon name="arrowLeft" size="sm" aria-hidden />
        back to projects
      </TextLink>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-8">
            <h1 className="font-display text-title">{project.title}</h1>

            <ul className="flex flex-wrap gap-2.5">
              {project.tags.map((tag, i) => (
                <li key={tag}>
                  <Badge color={accentColors[i % accentColors.length]}>
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {specs ? (
            <ProjectSpecList>
              {specs.map((spec) => {
                const href = spec.href;
                const isLink = href != null;

                return (
                  <ProjectSpecItem key={spec.label} label={spec.label}>
                    {isLink ? (
                      <TextLink
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {spec.value}
                        <Icon name="arrowUpRight" size="sm" aria-hidden />
                      </TextLink>
                    ) : (
                      spec.value
                    )}
                  </ProjectSpecItem>
                );
              })}
            </ProjectSpecList>
          ) : null}
        </div>

        <Image
          src={project.hero}
          alt={project.heroAlt}
          width={PROJECT_MEDIA_WIDTH}
          height={PROJECT_MEDIA_HEIGHT}
          className="border-strong w-full rounded-lg border"
        />
      </div>

      <RichText className="prose prose-lg max-w-none">
        <Content />
      </RichText>
    </div>
  );
}
