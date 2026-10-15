import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/Dialog";
import { MediaFrame } from "@/components/MediaFrame";
import { PROJECT_MEDIA_HEIGHT, PROJECT_MEDIA_WIDTH } from "@/lib/project-media";
import { cn } from "@/lib/utils";

type ImageCardProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
};

export function ImageCard({
  src,
  alt,
  caption,
  className,
  width = PROJECT_MEDIA_WIDTH,
  height = PROJECT_MEDIA_HEIGHT,
}: ImageCardProps) {
  const hasCaption = Boolean(caption);
  const expandLabel = `View larger: ${alt}`;

  return (
    <figure className={cn("not-prose my-0 flex flex-col gap-3", className)}>
      <Dialog>
        <div className="relative">
          <MediaFrame>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              className="my-0 block w-full"
            />
          </MediaFrame>
          <DialogTrigger
            aria-label={expandLabel}
            className="absolute inset-0 hidden cursor-zoom-in sm:block"
          />
        </div>
        {hasCaption ? (
          <figcaption className="text-subtle text-center text-base">
            {caption}
          </figcaption>
        ) : null}
        <DialogContent>
          <DialogClose />
          <MediaFrame>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              className="my-0 block h-auto max-h-[85vh] w-full object-contain"
            />
          </MediaFrame>
          {hasCaption ? (
            <p className="text-brand-foreground mt-3 text-center text-base">
              {caption}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </figure>
  );
}
