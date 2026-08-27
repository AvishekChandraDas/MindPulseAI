import { cn } from "@/lib/utils";

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  label: string;
  className?: string;
};

export function ProgressIndicator({
  currentStep,
  totalSteps,
  label,
  className,
}: ProgressIndicatorProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div
        aria-label={`${label} progress`}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
