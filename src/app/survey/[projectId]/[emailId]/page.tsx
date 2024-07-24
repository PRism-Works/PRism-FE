'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SurveyStep } from '@/models/survey/surveyModels';
import { questions } from '@/lib/surveyQuestion';
import RatingAnswer from '@/components/domain/survey/answerType/RatingAnswer';
import CheckBoxAnswer from '@/components/domain/survey/answerType/CheckBoxAnswer';
import TextAnswer from '@/components/domain/survey/answerType/TextAnswer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const teamMembers = ['김이브', '나동현', '유혜성', '이나윤', '우지희', '박민수', '안유경'];

export default function SurveyPage() {
  const [current, setCurrent] = useState<number>(1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const methods = useForm<Record<string, unknown>>();

  const steps: SurveyStep[] = questions.map((question, index) => {
    if (index === 6) {
      return {
        component: CheckBoxAnswer,
        question: question,
        stepNumber: index + 1,
        teamMembers,
      };
    } else if (index === 12 || index === 13) {
      return { component: TextAnswer, question: question, stepNumber: index + 1, teamMembers };
    } else {
      return { component: RatingAnswer, question: question, stepNumber: index + 1, teamMembers };
    }
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // 평가지 제출 로직 추가 예정
  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
    alert('평가를 제출할까요?');
  };

  return (
    <div className="container min-h-screen w-full max-w-[1040px] p-4 flex-col-center">
      <Carousel setApi={setApi} className="relative mx-auto w-full max-w-[1040px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[1040px]">
            <CarouselContent>
              {steps.map((step, index) => {
                const StepComponent = step.component;
                return (
                  <CarouselItem key={index}>
                    <StepComponent
                      currentStep={current}
                      totalSteps={steps.length}
                      question={step.question}
                      stepNumber={step.stepNumber}
                      teamMembers={step.teamMembers}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </form>
        </FormProvider>
        <div className="flex-center">
          <CarouselPrevious className="h-10 w-10" />
          {current === steps.length ? (
            <Button type="submit" className="-mt-9 h-[50px] w-[100px] cursor-pointer body8">
              등록하기
            </Button>
          ) : (
            <CarouselNext className="h-10 w-10" />
          )}
        </div>
      </Carousel>
    </div>
  );
}
