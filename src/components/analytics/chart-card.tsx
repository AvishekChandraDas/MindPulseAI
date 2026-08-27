import type { ReactNode } from "react";

import { Card, CardContent, H3, Small, Text } from "@/components/ui";

type ChartCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ChartCard({
  eyebrow,
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </Small>
          <H3 className="text-2xl">{title}</H3>
          <Text className="text-muted-foreground">{description}</Text>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
