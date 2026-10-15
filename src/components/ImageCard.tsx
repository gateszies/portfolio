import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/Dialog";
import { MediaFrame } from "@/components/MediaFrame";
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
  width = 1280,
  height = 720,
}: ImageCardProps) {
  const hasCaption = Boolean(caption);
  const expandLabel = `View larger: ${alt}`;

  return (
    <figure className={cn("not-prose my-0 flex flex-col gap-3", className)}>
      <Dialog>
        <DialogTrigger
          aria-label={expandLabel}
          className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
        >
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
        </DialogTrigger>
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
