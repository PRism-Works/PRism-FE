import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectRegisterFooterProps {
  currStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleExternalSubmit: () => void;
  isValid: boolean;
  MAX_STEP: number;
}

export default function ProjectRegisterFooter({
  currStep,
  handlePrevStep,
  handleNextStep,
  handleExternalSubmit,
  isValid,
  MAX_STEP,
}: ProjectRegisterFooterProps) {
  const getButtonClass = (isEnabled: boolean) =>
    `h-10 w-10 stroke-[1.5px] ${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'}`;
  const isLastStep = currStep === MAX_STEP;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex-1" /> {/* 왼쪽 여백 */}
      <div className="gap-4 flex-center">
        <ArrowLeftCircle
          className={getButtonClass(currStep > 0)}
          onClick={currStep > 0 ? handlePrevStep : undefined}
        />
        <ArrowRightCircle
          className={getButtonClass(isValid && currStep < MAX_STEP)}
          onClick={!isLastStep ? handleNextStep : undefined}
        />
      </div>
      <div className="flex flex-1 justify-end">
        {isLastStep && (
          <Button
            onClick={handleExternalSubmit}
            className="rounded-[10px] px-[16px] py-[10px] text-white mobile1 bg-purple-indigo-gradient">
            등록하기
          </Button>
        )}
      </div>
    </div>
  );
}
