"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/Carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/Dialog";
import { MediaFrame } from "@/components/MediaFrame";
import { PROJECT_MEDIA_HEIGHT, PROJECT_MEDIA_WIDTH } from "@/lib/project-media";
import { cn } from "@/lib/utils";

type ImageCarouselImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type ImageCarouselProps = {
  images: ImageCarouselImage[];
  className?: string;
};

type CarouselFrameProps = {
  images: ImageCarouselImage[];
  index: number;
  imageClassName?: string;
};

function CarouselFrame({ images, index, imageClassName }: CarouselFrameProps) {
  return (
    <MediaFrame>
      <div
        className="flex motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, i) => {
          const isCurrent = i === index;
          const width = image.width ?? PROJECT_MEDIA_WIDTH;
          const height = image.height ?? PROJECT_MEDIA_HEIGHT;

          return (
            <div key={image.src} className="w-full shrink-0">
              <Image
                src={image.src}
                alt={isCurrent ? image.alt : ""}
                width={width}
                height={height}
                unoptimized
                aria-hidden={!isCurrent}
                className={cn("my-0 block w-full", imageClassName)}
              />
            </div>
          );
        })}
      </div>
    </MediaFrame>
  );
}

type ImageCarouselBodyProps = {
  images: ImageCarouselImage[];
  className?: string;
};

function ImageCarouselBody({ images, className }: ImageCarouselBodyProps) {
  const { index, positionLabel, hasMultiple, onRegionKeyDown } = useCarousel();
  const current = images[index];

  if (!current) {
    return null;
  }

  const caption = current.caption;
  const hasCaption = Boolean(caption);
  const expandLabel = hasMultiple
    ? `View larger: ${current.alt}. ${positionLabel}. Left and right arrows change image`
    : `View larger: ${current.alt}`;

  return (
    <figure
      className={cn("not-prose my-0 flex flex-col gap-3", className)}
      aria-roledescription="carousel"
      aria-label={positionLabel}
      onKeyDown={onRegionKeyDown}
    >
      <div className="relative">
        <Dialog>
          <CarouselFrame images={images} index={index} />
          <DialogTrigger
            aria-label={expandLabel}
            className="absolute inset-0 hidden cursor-zoom-in sm:block"
          />
          <DialogContent onKeyDown={onRegionKeyDown}>
            <DialogClose />
            <CarouselPrevious tabIndex={-1} />
            <CarouselNext tabIndex={-1} />
            <CarouselFrame
              images={images}
              index={index}
              imageClassName="max-h-[85vh] object-contain"
            />
            {hasCaption ? (
              <p className="text-brand-foreground mt-3 text-center text-base">
                {caption}
              </p>
            ) : null}
          </DialogContent>
        </Dialog>
        <CarouselPrevious tabIndex={-1} />
        <CarouselNext tabIndex={-1} />
      </div>
      <CarouselDots />
      {hasCaption ? (
        <figcaption className="text-subtle text-center text-base">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const imageCount = images.length;

  if (imageCount === 0) {
    return null;
  }

  return (
    <Carousel count={imageCount} itemName="Image">
      <ImageCarouselBody images={images} className={className} />
    </Carousel>
  );
}
