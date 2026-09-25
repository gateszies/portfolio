import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";

const cardClasses =
  "group flex w-full gap-6 rounded-lg border border-strong p-8 transition-colors hover:border-subtle";
const thumbnailClasses = "size-15 shrink-0 rounded-lg border border-strong";
const bodyClasses = "flex flex-1 flex-col justify-center gap-2.5";
const titleClasses = "font-body text-xl font-bold text-foreground";
const descriptionClasses = "text-sm text-foreground";
const tagListClasses = "flex flex-wrap gap-2.5";

const hoverAccentClasses = [
  "group-hover:border-accent-one group-hover:text-accent-one",
  "group-hover:border-accent-two group-hover:text-accent-two",
  "group-hover:border-accent-three group-hover:text-accent-three",
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
                size="sm"
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
