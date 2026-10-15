import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { ClickReveal } from "@/components/ClickReveal";
import { Highlight } from "@/components/Highlight";
import { ImageCard } from "@/components/ImageCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import { TextLink } from "@/components/TextLink";
import { VideoCard } from "@/components/VideoCard";

function MdxLink({ href, ...props }: ComponentProps<"a">) {
  return <TextLink href={href ?? "#"} {...props} />;
}

const components: MDXComponents = {
  a: MdxLink,
  ClickReveal,
  Highlight,
  ImageCard,
  ImageCarousel,
  VideoCard,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
