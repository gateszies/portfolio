import Image from "next/image";
import Link from "next/link";

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
      className="group -m-2 flex gap-6 rounded-xl p-2 transition hover:bgColor-secondary"
    >
      <Image
        src={image}
        alt=""
        width={152}
        height={152}
        className="h-[152px] w-[152px] shrink-0 rounded-lg bgColor-secondary object-cover"
      />
      <div className="flex flex-col gap-2 py-1">
        <h3 className="text-heading-sm font-heading fgColor-primary group-hover:fgColor-accent">
          {title}
        </h3>
        <p className="text-body-md fgColor-secondary">{description}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bgColor-secondary px-3 py-1 text-body-sm fgColor-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
