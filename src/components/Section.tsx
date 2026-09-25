import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  id?: string;
  children: ReactNode;
};

export function Section({ title, id, children }: SectionProps) {
  return (
    <section id={id} className="flex flex-col gap-6">
      <h2 className="font-label text-foreground text-base font-medium tracking-widest">
        {title}
      </h2>
      {children}
    </section>
  );
}
