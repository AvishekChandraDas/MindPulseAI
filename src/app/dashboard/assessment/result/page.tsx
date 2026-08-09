import type { Metadata } from "next";

import { AssessmentResultView } from "@/components/assessment/assessment-result-view";
import { AssessmentEngineSkeleton } from "@/components/assessment";
import { gad7Questions, phq9Questions } from "@/components/assessment/mock-data";
import { decodeAssessmentAnswers } from "@/lib/assessment/encoding";
import { calculateGad7Score, calculatePhq9Score } from "@/lib/assessment/scoring";

type ResultPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export const metadata: Metadata = {
  title: "Assessment Results",
  description:
    "Local PHQ-9 and GAD-7 scoring results with an educational disclaimer and no persistence.",
};

const phq9Ids = phq9Questions.map((question) => question.id);
const gad7Ids = gad7Questions.map((question) => question.id);

export default function ResultPage({ searchParams }: ResultPageProps) {
  const payload = searchParams?.answers;
  const encoded = Array.isArray(payload) ? payload[0] : payload;
  const answerMap = decodeAssessmentAnswers(encoded);

  if (!answerMap) {
    return <AssessmentEngineSkeleton />;
  }

  const phq9 = calculatePhq9Score(answerMap, phq9Ids);
  const gad7 = calculateGad7Score(answerMap, gad7Ids);

  return <AssessmentResultView phq9={phq9} gad7={gad7} />;
}
