import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MarkdownBody } from "@/components/MarkdownBody";
import { Badge } from "@/components/ui/Badge";
import { getAllProjects } from "@/lib/projects";

const pageClasses =
  "mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pb-12 pt-12";
const titleClasses = "font-display text-display-md fgColor-primary";
const tagListClasses = "flex flex-wrap gap-2.5";
const heroImageClasses = "w-full rounded-lg border borderColor-strong";
const bodyClasses = [
  "flex flex-col gap-4 pt-4 text-body-lg fgColor-primary",
  "[&_a]:fgColor-poppy [&_a]:font-bold [&_a]:underline",
  "[&_h1]:font-display [&_h1]:text-display-sm [&_h1]:fgColor-primary",
  "[&_:is(h2,h3)]:font-subheading [&_:is(h2,h3)]:text-subheading-md [&_:is(h2,h3)]:fgColor-primary",
  "[&_:is(h4,h5,h6)]:font-subheading [&_:is(h4,h5,h6)]:text-subheading-sm [&_:is(h4,h5,h6)]:fgColor-primary",
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:border [&_:not(pre)>code]:borderColor-subtle [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
  "[&_.code-block]:overflow-hidden [&_.code-block]:rounded-lg [&_.code-block]:border [&_.code-block]:borderColor-subtle",
  "[&_.code-block-header]:flex [&_.code-block-header]:items-center [&_.code-block-header]:justify-between [&_.code-block-header]:border-b [&_.code-block-header]:borderColor-subtle [&_.code-block-header]:px-3 [&_.code-block-header]:py-2",
  "[&_.code-block-filename]:font-mono [&_.code-block-filename]:text-body-sm [&_.code-block-filename]:fgColor-primary",
  "[&_.js-copy-code]:fgColor-primary [&_.js-copy-code]:transition-colors [&_.js-copy-code]:hover:fgColor-brand [&_.js-copy-code]:disabled:opacity-50",
  "[&_pre]:overflow-x-auto [&_pre]:p-4",
  "[&_code]:font-mono [&_code]:text-body-sm",
  "[&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:borderColor-strong",
].join(" ");

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
    <div className={pageClasses}>
      <Breadcrumb href="/#work" label="back to projects" />

      <h1 className={titleClasses}>{project.title}</h1>

      <ul className={tagListClasses}>
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
        className={heroImageClasses}
      />

      <MarkdownBody html={project.bodyHtml} className={bodyClasses} />
    </div>
  );
}
