import { useFormContext } from 'react-hook-form';
import { TextAnswerProps } from '@/models/survey/surveyModels';
import SurveyLayout from '../SurveyLayout';
import TextRow from '../answerRow/TextRow';

interface InstructionProps {
  indicator: '강점' | '보완점';
}

const Instruction = ({ indicator }: InstructionProps) => (
  <div className="my-9 flex-center">
    <p className="text-gray-600 body7">
      <span className="text-black body6">{indicator}</span>을
      <span className="text-purple-600 body6"> 한가지로 요약</span>하고,
      <span className="text-black body6">그렇게 생각한 이유</span>를{' '}
      <span className="text-purple-600 body6">자세한 예</span>를 들어 설명해 주세요.
    </p>
  </div>
);

export default function TextAnswer({
  currentStep,
  totalSteps,
  question,
  stepNumber,
  teamMembers,
}: TextAnswerProps) {
  const { register } = useFormContext<Record<string, unknown>>();

  const indicator = stepNumber === 13 ? '강점' : '보완점';

  return (
    <SurveyLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      question={question.text}
      stepNumber={stepNumber}>
      {(stepNumber === 13 || stepNumber === 14) && <Instruction indicator={indicator} />}
      {teamMembers.map((member, index) => (
        <TextRow
          key={index}
          name={`responses[${stepNumber - 1}].responseDetails[${index}].response`}
          member={member}
          register={register}
          iconIndex={index}
          questionIndex={stepNumber - 1}
          index={index}
          indicator={indicator}
        />
      ))}
    </SurveyLayout>
  );
}
