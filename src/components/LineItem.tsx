const rowClasses =
  "flex items-center gap-6 border-b borderColor-strong py-4 text-body-md fgColor-primary";
const orgClasses = "min-w-[160px] shrink-0 underline";
const detailsClasses = "flex flex-1 items-center justify-between";
const datesClasses = "text-right";

type LineItemProps = {
  org: string;
  role: string;
  dates: string;
};

export function LineItem({ org, role, dates }: LineItemProps) {
  return (
    <div className={rowClasses}>
      <span className={orgClasses}>{org}</span>
      <div className={detailsClasses}>
        <span>{role}</span>
        <span className={datesClasses}>{dates}</span>
      </div>
    </div>
  );
}
