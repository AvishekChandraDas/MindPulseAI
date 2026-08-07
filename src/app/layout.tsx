import type { Metadata } from "next";

import { fontSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MindPulse AI",
    template: "%s | MindPulse AI",
  },
  description: "Educational mental wellness screening platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} min-h-full font-sans`}>
        {children}
      </body>
    </html>
  );
}
