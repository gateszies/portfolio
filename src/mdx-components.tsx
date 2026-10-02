import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { ClickReveal } from "@/components/ClickReveal";
import { Highlight } from "@/components/Highlight";
import { TextLink } from "@/components/TextLink";

function MdxLink({ href, ...props }: ComponentProps<"a">) {
  return <TextLink href={href ?? "#"} {...props} />;
}

const components: MDXComponents = {
  a: MdxLink,
  ClickReveal,
  Highlight,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
