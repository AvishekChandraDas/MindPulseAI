export type AssessmentAnswerMap = Record<string, string>;

export type ScoreBand = {
  label: string;
  description: string;
  recommendation: string;
};

export type ScoreResult = {
  score: number;
  band: ScoreBand;
};

const phq9Bands: Array<{ max: number; band: ScoreBand }> = [
  {
    max: 4,
    band: {
      label: "Minimal",
      description: "Very few symptoms were endorsed across the PHQ-9 items.",
      recommendation: "Continue routine self-checks and watch for changes over time.",
    },
  },
  {
    max: 9,
    band: {
      label: "Mild",
      description: "A few symptoms appear present, but the total remains relatively low.",
      recommendation: "Consider short-term self-care strategies and repeat screening later.",
    },
  },
  {
    max: 14,
    band: {
      label: "Moderate",
      description: "Symptoms may be affecting mood or daily functioning in a noticeable way.",
      recommendation: "Review results with a trusted professional or support person.",
    },
  },
  {
    max: 19,
    band: {
      label: "Moderately severe",
      description: "A stronger symptom pattern is present and may need additional support.",
      recommendation: "Seek a follow-up conversation with a mental health professional.",
    },
  },
  {
    max: 27,
    band: {
      label: "Severe",
      description: "The response pattern suggests a high symptom burden.",
      recommendation: "Reach out for prompt professional support and check local resources.",
    },
  },
];

const gad7Bands: Array<{ max: number; band: ScoreBand }> = [
  {
    max: 4,
    band: {
      label: "Minimal",
      description: "Few anxiety symptoms were reported on the GAD-7.",
      recommendation: "Keep monitoring and revisit if symptoms change.",
    },
  },
  {
    max: 9,
    band: {
      label: "Mild",
      description: "Some anxiety-related symptoms are present, but the total is still low.",
      recommendation: "Use grounding strategies and repeat the screening later if needed.",
    },
  },
  {
    max: 14,
    band: {
      label: "Moderate",
      description: "The score suggests a moderate anxiety signal.",
      recommendation: "Discuss the result with a professional or trusted support person.",
    },
  },
  {
    max: 21,
    band: {
      label: "Severe",
      description: "The response pattern suggests substantial anxiety symptoms.",
      recommendation: "Seek prompt support from a qualified professional.",
    },
  },
];

function toNumericScore(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function interpretScore(score: number, bands: Array<{ max: number; band: ScoreBand }>): ScoreBand {
  return bands.find((entry) => score <= entry.max)?.band ?? bands[bands.length - 1].band;
}

export function calculatePhq9Score(answerMap: AssessmentAnswerMap, questionIds: string[]) {
  const score = questionIds.reduce((total, questionId) => total + toNumericScore(answerMap[questionId]), 0);

  return {
    score,
    band: interpretScore(score, phq9Bands),
  } satisfies ScoreResult;
}

export function calculateGad7Score(answerMap: AssessmentAnswerMap, questionIds: string[]) {
  const score = questionIds.reduce((total, questionId) => total + toNumericScore(answerMap[questionId]), 0);

  return {
    score,
    band: interpretScore(score, gad7Bands),
  } satisfies ScoreResult;
}

export function interpretPhq9Score(score: number) {
  return interpretScore(score, phq9Bands);
}

export function interpretGad7Score(score: number) {
  return interpretScore(score, gad7Bands);
}
