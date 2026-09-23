const rowClasses =
  "flex items-center justify-between gap-6 border-b borderColor-strong py-4 text-body-md fgColor-primary";
const orgClasses = "min-w-[160px] underline";
const roleClasses = "flex-1 text-center";
const datesClasses = "w-[110px] text-right";

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
