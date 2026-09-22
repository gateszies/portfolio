import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const cardClasses =
  "group -m-2 flex gap-6 rounded-xl p-2 transition hover:bgColor-secondary";
const thumbnailClasses =
  "h-[152px] w-[152px] shrink-0 rounded-lg bgColor-secondary object-cover";
const bodyClasses = "flex flex-col gap-2 py-1";
const titleClasses =
  "text-heading-sm font-heading fgColor-primary group-hover:fgColor-accent";
const descriptionClasses = "text-body-md fgColor-secondary";
const tagListClasses = "mt-2 flex flex-wrap gap-2";

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
        width={152}
        height={152}
        className={thumbnailClasses}
      />
      <div className={bodyClasses}>
        <h3 className={titleClasses}>{title}</h3>
        <p className={descriptionClasses}>{description}</p>
        <ul className={tagListClasses}>
          {tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
