import { useFormContext } from 'react-hook-form';
import { CheckBoxAnswerProps } from '@/models/survey/surveyModels';
import SurveyLayout from '../SurveyLayout';
import CheckBoxRow from '../answerRow/CheckBoxRow';

export default function CheckBoxAnswer({
  currentStep,
  totalSteps,
  question,
  stepNumber,
  teamMembers,
}: CheckBoxAnswerProps) {
  const { register } = useFormContext<Record<string, unknown>>();

  return (
    <SurveyLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      question={question.text}
      stepNumber={stepNumber}>
      <div className="w-full space-y-4">
        {teamMembers.map((member, index) => (
          <CheckBoxRow
            key={index}
            name={`question${stepNumber}_${member}`}
            member={member}
            register={register}
          />
        ))}
      </div>
    </SurveyLayout>
  );
}
