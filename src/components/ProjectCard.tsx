import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const cardClasses =
  "group flex w-full gap-6 rounded-lg border borderColor-strong p-8 transition hover:borderColor-subtle";
const thumbnailClasses =
  "size-15 shrink-0 rounded-lg border borderColor-strong";
const bodyClasses = "flex flex-1 flex-col justify-center gap-2.5";
const titleClasses = "font-body text-body-xl fgColor-primary";
const descriptionClasses = "text-body-sm fgColor-primary";
const tagListClasses = "flex flex-wrap gap-2.5";

const hoverAccentClasses = [
  "group-hover:borderColor-poppy group-hover:fgColor-poppy",
  "group-hover:borderColor-sky group-hover:fgColor-sky",
  "group-hover:borderColor-ochre group-hover:fgColor-ochre",
];

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};

export function ProjectCard({
  slug,
  title,
  description,
  tags,
  image,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className={cardClasses}>
      <Image
        src={image}
        alt=""
        width={60}
        height={60}
        className={thumbnailClasses}
      />
      <div className={bodyClasses}>
        <h3 className={titleClasses}>{title}</h3>
        <p className={descriptionClasses}>{description}</p>
        <ul className={tagListClasses}>
          {tags.map((tag, i) => (
            <li key={tag}>
              <Badge
                className={hoverAccentClasses[i % hoverAccentClasses.length]}
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
