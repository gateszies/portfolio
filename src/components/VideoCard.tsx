import { MediaFrame } from "@/components/MediaFrame";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  className?: string;
};

export function VideoCard({
  src,
  alt,
  caption,
  poster,
  className,
}: VideoCardProps) {
  const hasCaption = Boolean(caption);

  return (
    <figure className={cn("not-prose my-0 flex flex-col gap-3", className)}>
      <MediaFrame>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={alt}
          className="my-0 block w-full"
        />
      </MediaFrame>
      {hasCaption ? (
        <figcaption className="text-subtle text-center text-base">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
