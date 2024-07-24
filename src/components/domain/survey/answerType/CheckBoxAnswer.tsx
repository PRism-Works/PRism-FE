import React from 'react';
import { useFormContext } from 'react-hook-form';
import CheckBoxRow from '../answerRow/CheckBoxRow';
import SurveyLayout from '../SurveyLayout';
import { CheckBoxAnswerProps } from '../surveyTypes';

export default function CheckBoxAnswer({
  currentStep,
  totalSteps,
  question,
  stepNumber,
  teamMembers,
}: CheckBoxAnswerProps): JSX.Element {
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
