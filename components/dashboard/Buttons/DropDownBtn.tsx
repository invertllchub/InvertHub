"use client";

type Option<T extends string> = {
  label: string;
  value: T;
};

type DropDownBtnProps<T extends string> = {
  value: T;
  options: readonly Option<T>[]; 
  onChange: (value: T) => void;
  className?: string;
};

export default function DropDownBtn<T extends string>({
  value,
  options,
  onChange,
  className = "",
}: DropDownBtnProps<T>) {
  return (
    <div className="flex flex-col gap-2 w-48">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`rounded-lg py-3 bg-white shadow-md text-center outline-0 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
