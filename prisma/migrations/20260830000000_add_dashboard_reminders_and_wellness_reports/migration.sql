-- Additive migration: preserves all existing user, assessment, mood, and Auth.js data.
CREATE TYPE "ReminderPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "priority" "ReminderPriority" NOT NULL DEFAULT 'MEDIUM',
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WellnessReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assessmentResults" JSONB NOT NULL,
    "moodPatterns" JSONB NOT NULL,
    "wellnessObservations" JSONB NOT NULL,
    "supportiveNextSteps" JSONB NOT NULL,
    "disclaimer" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WellnessReport_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Reminder_userId_dueAt_idx" ON "Reminder"("userId", "dueAt");
CREATE INDEX "Reminder_userId_completedAt_idx" ON "Reminder"("userId", "completedAt");
CREATE INDEX "WellnessReport_userId_generatedAt_idx" ON "WellnessReport"("userId", "generatedAt");

ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WellnessReport" ADD CONSTRAINT "WellnessReport_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
