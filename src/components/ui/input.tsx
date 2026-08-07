import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type InputSize = "sm" | "md" | "lg";

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

export type InputProps = {
  inputSize?: InputSize;
  invalid?: boolean;
} & ComponentProps<"input">;

export function Input({
  className,
  inputSize = "md",
  invalid = false,
  type = "text",
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn(
        "flex w-full rounded-md border border-input bg-background text-foreground",
        "placeholder:text-muted-foreground",
        "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        invalid && "border-destructive focus-visible:ring-destructive",
        sizeClasses[inputSize],
        className,
      )}
      {...props}
    />
  );
}

export type TextareaProps = {
  invalid?: boolean;
} & ComponentProps<"textarea">;

export function Textarea({
  className,
  invalid = false,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn(
        "flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        invalid && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...props}
    />
  );
}

export type LabelProps = ComponentProps<"label">;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

export type FieldHintProps = ComponentProps<"p"> & {
  invalid?: boolean;
};

export function FieldHint({
  className,
  invalid = false,
  ...props
}: FieldHintProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        invalid && "text-destructive",
        className,
      )}
      {...props}
    />
  );
}
