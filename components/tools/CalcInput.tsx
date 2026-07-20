export function CalcInput({
  id,
  label,
  ariaLabel,
  value,
  onChange,
  suffix,
}: {
  id: string;
  label?: string;
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block font-mono text-xs text-ink-soft"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={ariaLabel}
          className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-ink outline-none focus:border-primary"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-soft">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
