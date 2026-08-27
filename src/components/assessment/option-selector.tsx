import type { ChangeEvent } from "react";

import { cn } from "@/lib/utils";

import type { Option } from "./mock-data";

type OptionSelectorProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function OptionSelector({
  name,
  options,
  value,
  onChange,
  invalid = false,
  describedBy,
}: OptionSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="grid gap-3"
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/20 hover:bg-muted/50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value)
              }
              className="mt-1 h-4 w-4 border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            />
            <span className="space-y-1">
              <span className="block text-sm font-medium text-foreground">
                {option.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {option.description}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
