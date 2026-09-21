type LineItemProps = {
  org: string;
  role: string;
  dates: string;
};

export function LineItem({ org, role, dates }: LineItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-fg-secondary)]/15 py-4 text-body-md">
      <span className="fgColor-primary font-medium">{org}</span>
      <span className="flex-1 text-center fgColor-secondary">{role}</span>
      <span className="fgColor-secondary">{dates}</span>
    </div>
  );
}
