"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <Button
      type="button"
      size="lg"
      className="w-full sm:w-auto"
      onClick={() => void signIn("google", { callbackUrl: "/dashboard" })}
    >
      Continue with Google
    </Button>
  );
}
