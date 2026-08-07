import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
};

export type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;

export function Spinner({
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "inline-block rounded-full border-current border-t-transparent text-primary animate-spin",
          sizeClasses[size],
        )}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
