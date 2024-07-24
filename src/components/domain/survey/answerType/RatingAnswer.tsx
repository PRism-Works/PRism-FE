import { useFormContext } from 'react-hook-form';
import { RatingAnswerProps } from '../surveyTypes';
import SurveyLayout from '../SurveyLayout';
import RatingScale from '../RatingScale';
import RatingRow from '../answerRow/RatingRow';

export default function RatingAnswer({
  currentStep,
  totalSteps,
  question,
  stepNumber,
  teamMembers,
}: RatingAnswerProps): JSX.Element {
  const { register } = useFormContext<Record<string, unknown>>();

  return (
    <SurveyLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      question={question.text}
      stepNumber={stepNumber}>
      <div className="flex flex-col items-end gap-2">
        <RatingScale />
        <div className="w-full space-y-4">
          {teamMembers.map((member, index) => (
            <RatingRow
              key={index}
              name={`question${stepNumber}_${member}`}
              member={member}
              register={register}
            />
          ))}
        </div>
      </div>
    </SurveyLayout>
  );
}
