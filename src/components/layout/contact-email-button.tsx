"use client";

import { Button, type ButtonProps } from "@/components/ui/button";

type ContactEmailButtonProps = {
  email?: string;
  label?: string;
} & Pick<ButtonProps, "variant" | "size" | "className">;

export function ContactEmailButton({
  email = "hello@mindpulseai.com",
  label = "Email us",
  variant = "primary",
  size = "md",
  className,
}: ContactEmailButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    >
      {label}
    </Button>
  );
}