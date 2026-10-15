import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";

const badgeColors = ["accentOne", "accentTwo", "accentThree"] as const;

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
    <Link
      href={`/projects/${slug}`}
      className="border-subtle bg-chrome flex w-full flex-col gap-6 rounded-2xl border p-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] motion-safe:active:duration-0"
    >
      <Image
        src={image}
        alt=""
        width={1280}
        height={720}
        className="w-full rounded-xl"
      />
      <div className="flex flex-col gap-2.5">
        <h3 className="font-display text-4xl">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
      <ul className="flex flex-wrap gap-2.5">
        {tags.map((tag, i) => (
          <li key={tag}>
            <Badge color={badgeColors[i % badgeColors.length]}>{tag}</Badge>
          </li>
        ))}
      </ul>
    </Link>
  );
}
