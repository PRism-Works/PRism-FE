import ProgressBar from '@/components/common/progressBar/ProgressBar';

interface SurveyLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  question: string;
  stepNumber: number;
}

export default function SurveyLayout({
  children,
  currentStep,
  totalSteps,
  question,
  stepNumber,
}: SurveyLayoutProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="mx-auto max-h-[900px] w-full max-w-[1040px] overflow-y-auto p-4 md:p-8">
      <div className="mb-2 flex-center">
        <div className="mr-3 h-8 w-8 rounded-full bg-black text-white display6 flex-center">
          {stepNumber}
        </div>
        <p className="text-purple-800 body2">{question}</p>
      </div>
      <div className="mb-4">
        <div className="text-purple-700 text-right body8">{`${currentStep}/${totalSteps}`}</div>
        <ProgressBar percent={progressPercent} />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
