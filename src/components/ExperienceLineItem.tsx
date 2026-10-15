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
    <div className="border-subtle hover:bg-chrome flex flex-col gap-1 border-b py-4 text-base transition-colors sm:col-span-3 sm:grid sm:grid-cols-subgrid sm:items-center sm:gap-6">
      <span className="font-bold">{org}</span>
      <span>{role}</span>
      <span className="text-sm sm:text-right">{dates}</span>
    </div>
  );
}
