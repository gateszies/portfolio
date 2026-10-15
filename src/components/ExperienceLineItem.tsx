type ExperienceLineItemProps = {
  org: string;
  role: string;
  dates: string;
};

export function ExperienceLineItem({
  org,
  role,
  dates,
}: ExperienceLineItemProps) {
  return (
    <div className="border-subtle hover:bg-chrome flex items-center justify-between gap-6 border-b py-4 text-base transition-colors sm:col-span-3 sm:grid sm:grid-cols-subgrid">
      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <span className="font-bold">{org}</span>
        <span>{role}</span>
      </div>
      <span className="shrink-0 text-right text-sm">{dates}</span>
    </div>
  );
}
