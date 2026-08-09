-- AlterTable
ALTER TABLE "Assessment"
ADD COLUMN     "phq9Score" INTEGER,
ADD COLUMN     "gad7Score" INTEGER,
ADD COLUMN     "phq9Severity" TEXT,
ADD COLUMN     "gad7Severity" TEXT;
