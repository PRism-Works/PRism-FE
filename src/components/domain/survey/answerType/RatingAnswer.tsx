import { useFormContext } from 'react-hook-form';
import { RatingAnswerProps } from '@/models/survey/surveyModels';
import SurveyLayout from '../SurveyLayout';
import RatingScale from '../RatingScale';
import RatingRow from '../answerRow/RatingRow';

export default function RatingAnswer({
  currentStep,
  totalSteps,
  question,
  stepNumber,
  teamMembers,
}: RatingAnswerProps) {
  const { register } = useFormContext<Record<string, unknown>>();

  return (
    <SurveyLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      question={question.text}
      stepNumber={stepNumber}>
      <div className="flex flex-col items-end gap-2">
        <RatingScale />
        <div className="w-full space-y-2">
          {teamMembers?.map((revieweeName, index) => (
            <RatingRow
              key={index}
              revieweeName={revieweeName}
              register={register}
              iconIndex={index}
              index={index}
              questionIndex={stepNumber - 1}
            />
          )) ?? <p>팀원 정보를 불러올 수 없습니다.</p>}
        </div>
      </div>
    </SurveyLayout>
  );
}
