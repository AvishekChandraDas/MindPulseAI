import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

type TypographyOwnProps<T extends ElementType> = {
  as?: T;
};

type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
  Omit<ComponentProps<T>, keyof TypographyOwnProps<T>>;

function createTypography<T extends ElementType>(
  defaultElement: T,
  baseClassName: string,
) {
  return function Typography({ as, className, ...props }: TypographyProps<T>) {
    const Component = (as ?? defaultElement) as ElementType;
    return <Component className={cn(baseClassName, className)} {...props} />;
  };
}

export const H1 = createTypography(
  "h1",
  "scroll-m-20 text-4xl font-bold tracking-tight text-balance sm:text-5xl",
);

export const H2 = createTypography(
  "h2",
  "scroll-m-20 text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
);

export const H3 = createTypography(
  "h3",
  "scroll-m-20 text-2xl font-semibold tracking-tight",
);

export const H4 = createTypography(
  "h4",
  "scroll-m-20 text-xl font-semibold tracking-tight",
);

export const Text = createTypography(
  "p",
  "text-base leading-7 text-foreground",
);

export const Lead = createTypography(
  "p",
  "text-lg leading-8 text-muted-foreground text-balance",
);

export const Muted = createTypography(
  "p",
  "text-sm leading-6 text-muted-foreground",
);

export const Small = createTypography(
  "small",
  "text-xs font-medium leading-none text-muted-foreground",
);

export type InlineCodeProps = ComponentProps<"code">;

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    />
  );
}
