import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/Footer";
import { LinkList } from "@/components/LinkList";
import { socialLinks } from "@/data/social";
import { getAllProjects } from "@/lib/projects";

const pageClasses =
  "mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pb-12 pt-12";
const backLinkClasses =
  "font-subheading text-subheading-sm fgColor-primary underline decoration-dotted decoration-transparent underline-offset-4 transition-colors hover:decoration-current";
const titleClasses = "font-display text-display-md fgColor-primary";
const tagListClasses = "flex flex-wrap gap-2.5";
const heroImageClasses = "w-full rounded-lg border borderColor-strong";
const bodyClasses = [
  "flex flex-col gap-4 pt-4 text-body-lg fgColor-primary",
  "[&_a]:fgColor-poppy [&_a]:font-bold [&_a]:underline",
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:border [&_:not(pre)>code]:borderColor-subtle [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
  "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:borderColor-subtle [&_pre]:p-4",
  "[&_code]:font-mono [&_code]:text-body-sm",
  "[&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:borderColor-strong",
].join(" ");
const footerRowClasses = "flex items-center justify-between gap-6 pt-14";

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

      <div
        className={bodyClasses}
        dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
      />

      <footer className={footerRowClasses}>
        <Footer />
        <LinkList links={socialLinks} />
      </footer>
    </div>
  );
}
