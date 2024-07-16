import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectRegisterFooterProps {
  currStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleExternalSubmit: () => void;
  MAX_STEP: number;
}

export default function ProjectRegisterFooter({
  currStep,
  handlePrevStep,
  handleNextStep,
  handleExternalSubmit,
  MAX_STEP,
}: ProjectRegisterFooterProps) {
  const getButtonClass = (isEnabled: boolean) =>
    `h-10 w-10 stroke-[1.5px] ${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'}`;
  const isLastStep = currStep === MAX_STEP;

  return (
    <div className="w-full gap-1 flex-col-center">
      {currStep === 1 && (
        <div className="text-gray-600 caption">
          <span className="text-info-500">메일 주소</span>
          <span>로 팀원을 확인하기 때문에 </span>
          <span className="text-info-500">한 번 더 확인해 주세요!</span>
        </div>
      )}
      <div className="flex w-full items-center">
        <div className="flex-1" /> {/* 왼쪽 여백 */}
        <div className="gap-4 flex-center">
          <ArrowLeftCircle
            className={getButtonClass(currStep > 0)}
            onClick={currStep > 0 ? handlePrevStep : undefined}
          />
          <ArrowRightCircle
            className={getButtonClass(currStep < MAX_STEP)}
            onClick={!isLastStep ? handleNextStep : undefined}
          />
        </div>
        <div className="flex flex-1 justify-end">
          {isLastStep && (
            <Button
              onClick={handleExternalSubmit}
              className="rounded-[10px] bg-purple-500 px-[16px] py-[10px] text-white mobile1 hover:bg-purple-600">
              등록하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
