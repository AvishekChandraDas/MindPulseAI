import type { ComponentProps } from "react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted disabled:hover:bg-transparent",
  ghost:
    "bg-transparent text-foreground hover:bg-muted disabled:hover:bg-transparent",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-11 gap-2 px-6 text-base",
};

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingLabel = "Loading",
  className,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size={size === "lg" ? "md" : "sm"} label={loadingLabel} />
          {children ? <span className="opacity-90">{children}</span> : null}
        </>
      ) : (
        children
      )}
    </button>
  );
}
