import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";

const pageClasses = "mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pb-24 pt-12";
const backLinkClasses = "text-body-md fgColor-secondary transition hover:fgColor-accent";
const titleClasses = "font-display text-display-sm fgColor-primary";
const tagListClasses = "flex flex-wrap gap-2";
const heroImageClasses = "w-full rounded-xl bgColor-secondary object-cover";
const bodyClasses = [
  "flex flex-col gap-4 text-body-lg fgColor-secondary",
  // links
  "[&_a]:fgColor-accent [&_a]:underline",
  // inline `code`
  "[&_:not(pre)>code]:bgColor-secondary [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
  // ```fenced code blocks```
  "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bgColor-secondary [&_pre]:p-4",
  "[&_code]:font-mono [&_code]:text-body-sm",
  // ![inline images](in the write-up)
  "[&_img]:w-full [&_img]:rounded-xl [&_img]:bgColor-secondary",
].join(" ");

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={pageClasses}>
      <Link href="/#work" className={backLinkClasses}>
        &larr; back to projects
      </Link>

      <h1 className={titleClasses}>{project.title}</h1>

      <ul className={tagListClasses}>
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
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

      <div
        className={bodyClasses}
        dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
      />

      <Footer linkHref="/" linkLabel="back home" />
    </div>
  );
}
