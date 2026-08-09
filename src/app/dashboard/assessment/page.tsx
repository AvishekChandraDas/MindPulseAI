import type { Metadata } from "next";

import { AssessmentFlow } from "@/components/assessment";

export const metadata: Metadata = {
  title: "Assessment Engine",
  description:
    "Educational multi-step PHQ-9 and GAD-7 assessment flow with consent, local state only, and confirmation.",
};

export default function AssessmentPage() {
  return <AssessmentFlow />;
}