import type { Metadata } from "next";

import { AssessmentResultView } from "@/components/assessment/assessment-result-view";
import {
  gad7Questions,
  phq9Questions,
} from "@/components/assessment/mock-data";
import {
  calculateGad7Score,
  calculatePhq9Score,
  interpretGad7Score,
  interpretPhq9Score,
} from "@/lib/assessment/scoring";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { z } from "zod";

type ResultPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Assessment Results",
  description:
    "Saved PHQ-9 and GAD-7 scoring results with an educational disclaimer.",
};

const phq9Ids = phq9Questions.map((question) => question.id);
const gad7Ids = gad7Questions.map((question) => question.id);
const resultSearchSchema = z.object({
  assessmentId: z.string().min(1),
  saved: z.string().optional(),
});

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const parsedSearch = resultSearchSchema.safeParse({
    assessmentId: Array.isArray(resolvedSearchParams.assessmentId)
      ? resolvedSearchParams.assessmentId[0]
      : resolvedSearchParams.assessmentId,
    saved: Array.isArray(resolvedSearchParams.saved)
      ? resolvedSearchParams.saved[0]
      : resolvedSearchParams.saved,
  });

  if (!parsedSearch.success) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        Missing assessment id. Return to the assessment and save it again.
      </div>
    );
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        Sign in to view saved assessment results.
      </div>
    );
  }

  const assessment = await prisma.assessment.findFirst({
    where: {
      id: parsedSearch.data.assessmentId,
      userId: currentUser.id,
    },
    include: {
      responses: true,
    },
  });

  if (!assessment) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        We could not find that saved assessment. It may belong to another
        account or was not saved.
      </div>
    );
  }

  const answerMap = assessment.responses.reduce(
  (
    accumulator: Record<string, string>,
    response: {
      questionId: string;
      selectedOption: string | null;
      answerNumber: number | null;
    },
  ) => {
    accumulator[response.questionId] =
      response.selectedOption ?? String(response.answerNumber ?? "0");

    return accumulator;
  },
  {} as Record<string, string>,
);

  const phq9 =
    assessment.phq9Score !== null && assessment.phq9Score !== undefined
      ? {
          score: assessment.phq9Score,
          band: {
            label:
              assessment.phq9Severity ??
              interpretPhq9Score(assessment.phq9Score).label,
            description: interpretPhq9Score(assessment.phq9Score).description,
            recommendation: interpretPhq9Score(assessment.phq9Score)
              .recommendation,
          },
        }
      : calculatePhq9Score(answerMap, phq9Ids);

  const gad7 =
    assessment.gad7Score !== null && assessment.gad7Score !== undefined
      ? {
          score: assessment.gad7Score,
          band: {
            label:
              assessment.gad7Severity ??
              interpretGad7Score(assessment.gad7Score).label,
            description: interpretGad7Score(assessment.gad7Score).description,
            recommendation: interpretGad7Score(assessment.gad7Score)
              .recommendation,
          },
        }
      : calculateGad7Score(answerMap, gad7Ids);

  const completedAt =
    assessment.completedAt?.toISOString() ?? assessment.updatedAt.toISOString();

  return (
    <AssessmentResultView
      assessmentId={assessment.id}
      savedMessage="The assessment is stored with your account, including every answer and both calculated scores."
      completedAt={completedAt}
      responseCount={assessment.responses.length}
      phq9={phq9}
      gad7={gad7}
    />
  );
}
//avishek