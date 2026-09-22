"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const IMAGE_SIZE = 160;
const CURSOR_OFFSET = 20;
const imageClasses =
  "pointer-events-none fixed z-50 rounded-2xl object-cover shadow-xl";

type Position = { x: number; y: number };

type HoverRevealProps = {
  image: string;
  alt: string;
  children: ReactNode;
  className?: string;
};

function positionStyle({ x, y }: Position): CSSProperties {
  return { left: x + CURSOR_OFFSET, top: y + CURSOR_OFFSET };
}

export function HoverReveal({
  image,
  alt,
  children,
  className,
}: HoverRevealProps) {
  const [pos, setPos] = useState<Position | null>(null);

  return (
    <span
      className={cn("star-cursor", className)}
      onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onPointerLeave={() => setPos(null)}
    >
      {children}
      {pos && (
        <Image
          src={image}
          alt={alt}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className={imageClasses}
          style={positionStyle(pos)}
        />
      )}
    </span>
  );
}
