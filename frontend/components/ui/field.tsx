import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}

export function Field({ label, hint, error, htmlFor, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className={error ? "text-destructive" : "text-dark-300 font-medium"}
      >
        {label}
      </Label>
      {hint && <p className="text-dark-600 text-xs">{hint}</p>}
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
