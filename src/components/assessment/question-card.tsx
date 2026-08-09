import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Small, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type QuestionCardProps = {
  id: string;
  title: string;
  description: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function QuestionCard({
  id,
  title,
  description,
  error,
  children,
  className,
}: QuestionCardProps) {
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <Card className={cn("border-border/80", className)}>
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Question
          </Small>
          <h3 id={id} className="text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h3>
          <Text id={descriptionId} className="text-muted-foreground">
            {description}
          </Text>
        </div>

        <div aria-describedby={error ? errorId : descriptionId}>{children}</div>

        {error ? (
          <p id={errorId} className="text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}