import { Button } from "@/components/ui/button";

type NavigationButtonsProps = {
  onPrevious?: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel: string;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
};

export function NavigationButtons({
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel,
  isPreviousDisabled = false,
  isNextDisabled = false,
  isNextLoading = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={!onPrevious || isPreviousDisabled}
      >
        {previousLabel}
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        isLoading={isNextLoading}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
