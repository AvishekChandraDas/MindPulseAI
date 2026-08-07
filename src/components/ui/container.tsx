import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

const maxWidthClasses: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export type ContainerProps = {
  size?: ContainerSize;
  centered?: boolean;
} & ComponentProps<"div">;

export function Container({
  size = "lg",
  centered = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        maxWidthClasses[size],
        centered && "mx-auto",
        className,
      )}
      {...props}
    />
  );
}

export type SectionProps = ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section className={cn("py-8 sm:py-12 lg:py-16", className)} {...props} />
  );
}

export type StackProps = {
  gap?: "none" | "xs" | "sm" | "md" | "lg";
} & ComponentProps<"div">;

const stackGapClasses: Record<NonNullable<StackProps["gap"]>, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return (
    <div
      className={cn("flex flex-col", stackGapClasses[gap], className)}
      {...props}
    />
  );
}
