export function ResultReadout({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="readout flex items-center justify-between rounded-md px-4 py-3">
      <span className="font-mono text-xs uppercase tracking-wide opacity-70">
        {label}
      </span>
      <span className="font-mono text-xl font-medium">{value}</span>
    </div>
  );
}
