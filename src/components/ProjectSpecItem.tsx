import type { ReactNode } from "react";

type ProjectSpecItemProps = {
  label: string;
  children: ReactNode;
};

export function ProjectSpecItem({ label, children }: ProjectSpecItemProps) {
  return (
    <div className="border-subtle grid grid-cols-[5rem_1fr] items-baseline gap-x-8 border-b py-3 text-base">
      <dt className="font-label text-sm font-medium tracking-widest uppercase">
        {label}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}
