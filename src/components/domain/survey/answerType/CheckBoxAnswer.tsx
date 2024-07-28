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
        {teamMembers?.map((member, index) => (
          <CheckBoxRow
            key={index}
            name={`responses[${stepNumber - 1}].responseDetails[${index}].response.choice`}
            member={member}
            register={register}
            iconIndex={index}
            questionIndex={stepNumber - 1}
            index={index}
          />
        )) ?? <p>팀원 정보를 불러올 수 없습니다.</p>}
      </div>
    </SurveyLayout>
  );
}
