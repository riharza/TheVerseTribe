import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-sans text-ivory-muted">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 bg-midnight-100 border border-[var(--border)] rounded-md",
          "text-ivory placeholder:text-ivory-dim font-sans text-sm",
          "transition-colors duration-200",
          "focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20",
          error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-sans text-ivory-muted">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 bg-midnight-100 border border-[var(--border)] rounded-md",
          "text-ivory placeholder:text-ivory-dim font-sans text-sm resize-y min-h-[100px]",
          "transition-colors duration-200",
          "focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20",
          error && "border-red-500/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-sans text-ivory-muted">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 bg-midnight-100 border border-[var(--border)] rounded-md",
          "text-ivory font-sans text-sm appearance-none cursor-pointer",
          "focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-midnight-100">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
