export type AssessmentStepKey = "consent" | "phq-9" | "gad-7" | "confirmation";

export type AssessmentStepItem = {
  key: AssessmentStepKey;
  label: string;
  description: string;
  href: string;
};

export type Option = {
  value: string;
  label: string;
  description: string;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  detail: string;
};

export const assessmentSteps: AssessmentStepItem[] = [
  {
    key: "consent",
    label: "Consent",
    description: "Educational screening overview",
    href: "#consent",
  },
  {
    key: "phq-9",
    label: "PHQ-9",
    description: "Depression screening questions",
    href: "#phq-9",
  },
  {
    key: "gad-7",
    label: "GAD-7",
    description: "Anxiety screening questions",
    href: "#gad-7",
  },
  {
    key: "confirmation",
    label: "Confirmation",
    description: "Review and restart",
    href: "#confirmation",
  },
];

export const responseOptions: Option[] = [
  { value: "0", label: "Not at all", description: "No days" },
  { value: "1", label: "Several days", description: "A few days" },
  { value: "2", label: "More than half the days", description: "Most days" },
  { value: "3", label: "Nearly every day", description: "Almost daily" },
];

export const consentHighlights = [
  "This is an educational screening experience, not a diagnosis.",
  "You can move back and review answers before confirming.",
  "Nothing is saved to a database or sent to an API.",
];

export const phq9Questions: AssessmentQuestion[] = [
  {
    id: "phq9-1",
    prompt: "Little interest or pleasure in doing things",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-2",
    prompt: "Feeling down, depressed, or hopeless",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-3",
    prompt: "Trouble falling or staying asleep, or sleeping too much",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-4",
    prompt: "Feeling tired or having little energy",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-5",
    prompt: "Poor appetite or overeating",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-6",
    prompt: "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-7",
    prompt: "Trouble concentrating on things, such as reading the newspaper or watching television",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-8",
    prompt: "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "phq9-9",
    prompt: "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
];

export const gad7Questions: AssessmentQuestion[] = [
  {
    id: "gad7-1",
    prompt: "Feeling nervous, anxious, or on edge",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-2",
    prompt: "Not being able to stop or control worrying",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-3",
    prompt: "Worrying too much about different things",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-4",
    prompt: "Trouble relaxing",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-5",
    prompt: "Being so restless that it is hard to sit still",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-6",
    prompt: "Becoming easily annoyed or irritable",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
  {
    id: "gad7-7",
    prompt: "Feeling afraid, as if something awful might happen",
    detail: "Over the last 2 weeks, how often have you been bothered by this?",
  },
];

export const consentSummary = {
  title: "Before you begin",
  description:
    "Review the purpose of the questionnaire and confirm that you understand the limits of this educational screening.",
};