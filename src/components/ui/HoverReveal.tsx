"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type HoverRevealProps = {
  image: string;
  alt: string;
  children: ReactNode;
  className?: string;
};

/** Wraps a trigger element with a star cursor and a photo that follows the pointer while hovering. */
export function HoverReveal({
  image,
  alt,
  children,
  className = "",
}: HoverRevealProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <span
      className={`star-cursor ${className}`}
      onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onPointerLeave={() => setPos(null)}
    >
      {children}
      {pos && (
        <Image
          src={image}
          alt={alt}
          width={160}
          height={160}
          className="pointer-events-none fixed z-50 rounded-2xl object-cover shadow-xl"
          style={{ left: pos.x + 20, top: pos.y + 20 }}
        />
      )}
    </span>
  );
}
