const rowClasses =
  "flex items-center justify-between gap-4 border-b border-[var(--color-fg-secondary)]/15 py-4 text-body-md";
const orgClasses = "fgColor-primary font-medium";
const roleClasses = "flex-1 text-center fgColor-secondary";
const datesClasses = "fgColor-secondary";

type LineItemProps = {
  org: string;
  role: string;
  dates: string;
};

export function LineItem({ org, role, dates }: LineItemProps) {
  return (
    <div className={rowClasses}>
      <span className={orgClasses}>{org}</span>
      <span className={roleClasses}>{role}</span>
      <span className={datesClasses}>{dates}</span>
    </div>
  );
}
