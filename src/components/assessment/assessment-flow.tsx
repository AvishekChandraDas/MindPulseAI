"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldHint, Label } from "@/components/ui/input";
import { Small, Text } from "@/components/ui/typography";

import { saveAssessmentAction } from "@/server/actions/assessment";

import {
  AssessmentQuestion,
  assessmentSteps,
  consentHighlights,
  consentSummary,
  gad7Questions,
  phq9Questions,
  responseOptions,
} from "./mock-data";
import { NavigationButtons } from "./navigation-buttons";
import { OptionSelector } from "./option-selector";
import { QuestionCard } from "./question-card";

type AssessmentAnswers = Record<string, string>;

const stepHashes = assessmentSteps.map((step) => step.href);

const getStepIndexFromHash = (hash: string) => {
  const index = stepHashes.indexOf(hash);
  return index >= 0 ? index : 0;
};

const questionError = (value: string) =>
  !value ? "Please select an answer to continue." : "";

function QuestionGroup({
  questions,
  answers,
  attempted,
  onChange,
  prefix,
}: {
  questions: AssessmentQuestion[];
  answers: AssessmentAnswers;
  attempted: boolean;
  onChange: (questionId: string, value: string) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const value = answers[question.id] ?? "";
        const error = attempted ? questionError(value) : "";

        return (
          <QuestionCard
            key={question.id}
            id={question.id}
            title={question.prompt}
            description={question.detail}
            error={error}
          >
            <OptionSelector
              name={`${prefix}-${question.id}`}
              options={responseOptions}
              value={value}
              onChange={(nextValue) => onChange(question.id, nextValue)}
              invalid={Boolean(error)}
              describedBy={
                error ? `${question.id}-error` : `${question.id}-description`
              }
            />
          </QuestionCard>
        );
      })}
    </div>
  );
}

export function AssessmentFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [stepHash, setStepHash] = useState(() => {
    if (typeof window === "undefined") {
      return "#consent";
    }

    return window.location.hash || "#consent";
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [attemptedStep, setAttemptedStep] = useState<AssessmentAnswers>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentStepIndex = useMemo(
    () => getStepIndexFromHash(stepHash),
    [stepHash],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash || "#consent";
      setStepHash(nextHash);
      setShowConfirmation(nextHash === "#confirmation");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#consent";
    }
  }, []);

  const phq9Answered = phq9Questions.filter(
    (question) => answers[question.id],
  ).length;
  const gad7Answered = gad7Questions.filter(
    (question) => answers[question.id],
  ).length;

  const goToHash = (hash: string) => {
    window.location.hash = hash;
    setStepHash(hash);
    setShowConfirmation(hash === "#confirmation");
  };

  const validateStep = () => {
    if (stepHash === "#consent" && !consentAccepted) {
      setAttemptedStep((current) => ({
        ...current,
        consent: "Please confirm the consent statement to continue.",
      }));
      return false;
    }

    if (stepHash === "#phq-9") {
      const missing = phq9Questions.some((question) => !answers[question.id]);
      if (missing) {
        setAttemptedStep((current) => ({
          ...current,
          "phq-9": "Complete every PHQ-9 question to continue.",
        }));
        return false;
      }
    }

    if (stepHash === "#gad-7") {
      const missing = gad7Questions.some((question) => !answers[question.id]);
      if (missing) {
        setAttemptedStep((current) => ({
          ...current,
          "gad-7": "Complete every GAD-7 question to continue.",
        }));
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    const nextIndex = Math.min(
      currentStepIndex + 1,
      assessmentSteps.length - 1,
    );
    goToHash(assessmentSteps[nextIndex].href);
  };

  const handlePrevious = () => {
    const previousIndex = Math.max(currentStepIndex - 1, 0);
    goToHash(assessmentSteps[previousIndex].href);
  };

  const handleExit = () => {
    window.location.href = "/dashboard";
  };

  const handleRestart = () => {
    setConsentAccepted(false);
    setAnswers({});
    setAttemptedStep({});
    setSubmitError(null);
    goToHash("#consent");
  };

  const handleSaveAssessment = () => {
    setSubmitError(null);

    startTransition(async () => {
      const response = await saveAssessmentAction({
        consentAccepted,
        answers,
      });

      if (!response.ok) {
        setSubmitError(response.error);
        return;
      }

      router.push(
        `/dashboard/assessment/result?assessmentId=${response.assessmentId}&saved=1`,
      );
    });
  };

  return (
    <div className="space-y-8">
      {!showConfirmation ? (
        <FadeIn>
          <Card className="border-primary/15 bg-primary/5">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {consentSummary.title}
              </div>
              <CardTitle className="text-2xl sm:text-3xl">
                {assessmentSteps[currentStepIndex]?.label}
              </CardTitle>
              <CardDescription className="max-w-3xl">
                {consentSummary.description}
              </CardDescription>
            </CardContent>
          </Card>
        </FadeIn>
      ) : null}

      {attemptedStep.consent ? (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
          {attemptedStep.consent}
        </p>
      ) : null}
      {attemptedStep["phq-9"] ? (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
          {attemptedStep["phq-9"]}
        </p>
      ) : null}
      {attemptedStep["gad-7"] ? (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
          {attemptedStep["gad-7"]}
        </p>
      ) : null}

      {stepHash === "#consent" ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <Card>
            <CardHeader>
              <Small className="uppercase tracking-[0.18em] text-primary">
                Consent screen
              </Small>
              <CardTitle>Educational screening overview</CardTitle>
              <CardDescription>
                Read this once before starting the questionnaire.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="space-y-3">
                {consentHighlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="consent-check"
                    className="text-sm font-medium"
                  >
                    I understand this screening is educational and not a
                    diagnosis.
                  </Label>
                  <div className="flex items-start gap-3">
                    <input
                      id="consent-check"
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(event) =>
                        setConsentAccepted(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    />
                    <div className="space-y-1">
                      <Text className="text-muted-foreground">
                        I have reviewed the guidance and want to continue.
                      </Text>
                      <FieldHint>
                        You can move backward at any time to review answers.
                      </FieldHint>
                    </div>
                  </div>
                </div>
              </div>

              <NavigationButtons
                onPrevious={handleExit}
                onNext={handleNext}
                nextLabel="Begin PHQ-9"
                isNextDisabled={!consentAccepted}
                previousLabel="Back to dashboard"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to expect</CardTitle>
              <CardDescription>
                This checklist keeps the flow predictable and accessible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-4">
                <Small className="uppercase tracking-[0.18em] text-primary">
                  Step order
                </Small>
                <div className="mt-3 space-y-3">
                  {assessmentSteps.map((step, index) => (
                    <div key={step.key} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{step.label}</div>
                        <Small>{step.description}</Small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <Small className="uppercase tracking-[0.18em] text-primary">
                  Saved progress
                </Small>
                <Text className="mt-2 text-muted-foreground">
                  Answers stay in component state while you review the
                  questionnaire and are saved only after confirmation.
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {stepHash === "#phq-9" ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6 sm:p-8">
              <Small className="uppercase tracking-[0.18em] text-primary">
                PHQ-9
              </Small>
              <CardTitle className="text-2xl">
                Depression screening questions
              </CardTitle>
              <CardDescription>
                Answer each question based on the last 2 weeks.
              </CardDescription>
            </CardContent>
          </Card>

          <QuestionGroup
            prefix="phq9"
            questions={phq9Questions}
            answers={answers}
            attempted={Boolean(attemptedStep["phq-9"])}
            onChange={(questionId, value) =>
              setAnswers((current) => ({ ...current, [questionId]: value }))
            }
          />

          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            nextLabel="Continue to GAD-7"
            isNextDisabled={phq9Answered !== phq9Questions.length}
          />
        </div>
      ) : null}

      {stepHash === "#gad-7" ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6 sm:p-8">
              <Small className="uppercase tracking-[0.18em] text-primary">
                GAD-7
              </Small>
              <CardTitle className="text-2xl">
                Anxiety screening questions
              </CardTitle>
              <CardDescription>
                Complete the final screening step using the same response scale.
              </CardDescription>
            </CardContent>
          </Card>

          <QuestionGroup
            prefix="gad7"
            questions={gad7Questions}
            answers={answers}
            attempted={Boolean(attemptedStep["gad-7"])}
            onChange={(questionId, value) =>
              setAnswers((current) => ({ ...current, [questionId]: value }))
            }
          />

          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            nextLabel="Review confirmation"
            isNextDisabled={gad7Answered !== gad7Questions.length}
          />
        </div>
      ) : null}

      {stepHash === "#confirmation" ? (
        <FadeIn>
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-primary/15 bg-primary/5">
              <CardHeader>
                <Small className="uppercase tracking-[0.18em] text-primary">
                  Confirmation screen
                </Small>
                <CardTitle className="text-2xl sm:text-3xl">
                  Your responses are ready for review.
                </CardTitle>
                <CardDescription>
                  Your answers will be saved with your account and scored
                  locally on the server.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Consent", consentAccepted ? "Accepted" : "Pending"],
                    ["PHQ-9", `${phq9Answered}/9 answered`],
                    ["GAD-7", `${gad7Answered}/7 answered`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border bg-background p-4"
                    >
                      <Small className="uppercase tracking-[0.18em] text-primary">
                        {label}
                      </Small>
                      <div className="mt-2 text-lg font-semibold tracking-tight">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <Text className="text-muted-foreground">
                    You can go back to adjust answers or restart the assessment.
                  </Text>
                </div>
                {submitError ? (
                  <p className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
                    {submitError}
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Answer snapshot</CardTitle>
                <CardDescription>
                  A session summary that will be persisted after you save.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <Small className="uppercase tracking-[0.18em] text-primary">
                    Consent
                  </Small>
                  <Text className="mt-2 text-muted-foreground">
                    {consentAccepted
                      ? "Consent confirmed."
                      : "Consent not yet confirmed."}
                  </Text>
                </div>
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <Small className="uppercase tracking-[0.18em] text-primary">
                    PHQ-9 and GAD-7
                  </Small>
                  <Text className="mt-2 text-muted-foreground">
                    {phq9Answered + gad7Answered} question responses captured in
                    local state.
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>

          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleRestart}
            previousLabel="Back to GAD-7"
            nextLabel="Start over"
          />
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSaveAssessment}
              isLoading={isPending}
            >
              Save and view results
            </Button>
          </div>
        </FadeIn>
      ) : null}
    </div>
  );
}
