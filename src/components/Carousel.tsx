"use client";

import { cva } from "class-variance-authority";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  index: number;
  count: number;
  hasMultiple: boolean;
  itemName: string;
  positionLabel: string;
  goTo: (nextIndex: number) => void;
  goPrev: () => void;
  goNext: () => void;
  onRegionKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel parts must be used within Carousel");
  }
  return context;
}

type CarouselProps = {
  count: number;
  itemName?: string;
  children: ReactNode;
};

export function Carousel({
  count,
  itemName = "Item",
  children,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const hasSlides = count > 0;
  const hasMultiple = count > 1;
  const safeIndex = hasSlides ? Math.min(index, count - 1) : 0;
  const positionLabel = `${itemName} ${safeIndex + 1} of ${count}`;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!hasMultiple) {
        return;
      }
      setIndex((nextIndex + count) % count);
    },
    [hasMultiple, count],
  );

  const goPrev = useCallback(() => {
    goTo(safeIndex - 1);
  }, [goTo, safeIndex]);

  const goNext = useCallback(() => {
    goTo(safeIndex + 1);
  }, [goTo, safeIndex]);

  const onRegionKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!hasMultiple) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [hasMultiple, goPrev, goNext],
  );

  const value = useMemo(
    () => ({
      index: safeIndex,
      count,
      hasMultiple,
      itemName,
      positionLabel,
      goTo,
      goPrev,
      goNext,
      onRegionKeyDown,
    }),
    [
      safeIndex,
      count,
      hasMultiple,
      itemName,
      positionLabel,
      goTo,
      goPrev,
      goNext,
      onRegionKeyDown,
    ],
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
}

const carouselControlVariants = cva(
  "bg-brand-foreground text-brand absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105",
  {
    variants: {
      side: {
        previous: "left-3",
        next: "right-3",
      },
    },
  },
);

type CarouselPreviousProps = Omit<
  ComponentProps<"button">,
  "type" | "children"
>;

export function CarouselPrevious({
  className,
  onClick,
  ...props
}: CarouselPreviousProps) {
  const { hasMultiple, goPrev, positionLabel } = useCarousel();

  if (!hasMultiple) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`Previous ${positionLabel}`}
      className={cn(carouselControlVariants({ side: "previous" }), className)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          goPrev();
        }
      }}
    >
      <Icon name="arrowLeft" size="md" aria-hidden />
    </button>
  );
}

type CarouselNextProps = Omit<ComponentProps<"button">, "type" | "children">;

export function CarouselNext({
  className,
  onClick,
  ...props
}: CarouselNextProps) {
  const { hasMultiple, goNext, positionLabel } = useCarousel();

  if (!hasMultiple) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`Next ${positionLabel}`}
      className={cn(carouselControlVariants({ side: "next" }), className)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          goNext();
        }
      }}
    >
      <Icon name="arrowRight" size="md" aria-hidden />
    </button>
  );
}

type CarouselDotsProps = Omit<ComponentProps<"div">, "children">;

export function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { count, index, hasMultiple, goTo, itemName } = useCarousel();

  if (!hasMultiple) {
    return null;
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      role="group"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const isCurrent = i === index;
        return (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            onClick={() => goTo(i)}
            aria-label={`Go to ${itemName.toLowerCase()} ${i + 1} of ${count}`}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "bg-brand size-2.5 cursor-pointer rounded-full border-0 motion-safe:transition-opacity motion-safe:duration-300",
              isCurrent ? "opacity-100" : "opacity-40 hover:opacity-70",
            )}
          />
        );
      })}
    </div>
  );
}
