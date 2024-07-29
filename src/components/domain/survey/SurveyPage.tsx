'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useSubmitSurvey } from '@/hooks/queries/useSurveyService';
import {
  SurveyStep,
  SurveyFormValues,
  surveyFormSchema,
  SURVEY_QUESTION_TYPE,
} from '@/models/survey/surveyModels';
import { SurveyLinkResponse, SubmitSurveyRequest } from '@/models/survey/surveyApiModels';
import { surveyQuestions } from '@/lib/surveyQuestions';
import SurveyIntroduction from '@/components/domain/survey/SurveyIntroduction';
import RatingAnswer from '@/components/domain/survey/answerType/RatingAnswer';
import CheckBoxAnswer from '@/components/domain/survey/answerType/CheckBoxAnswer';
import TextAnswer from '@/components/domain/survey/answerType/TextAnswer';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { MailOpen, Sparkles, AlertTriangle } from 'lucide-react';

interface SurveyPageProps {
  surveyData: SurveyLinkResponse;
}

export default function SurveyPage({ surveyData }: SurveyPageProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showIntroduction, setShowIntroduction] = useState<boolean>(true);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const { openModal, closeModal } = useModalStore();

  const methods = useForm<SurveyFormValues>({
    defaultValues: {
      reviewerEmail: surveyData?.data?.reviewerEmail ?? '',
      responses: surveyQuestions.map((question) => ({
        questionOrder: question.id.toString(),
        questionType: question.type,
        questionCategory: question.category,
        responseDetails:
          surveyData?.data?.revieweeInfoList?.map((info) => ({
            revieweeEmail: info.revieweeEmail,
            response: {},
          })) ?? [],
      })),
    },
  });

  useEffect(() => {
    if (surveyData?.data?.revieweeInfoList) {
      setTeamMembers(surveyData.data.revieweeInfoList.map((info) => info.revieweeName));
    }
  }, [surveyData]);

  useEffect(() => {
    if (!api) return;

    setCurrentStep(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentStep(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const steps: SurveyStep[] = surveyQuestions.map((question, index) => {
    switch (question.type) {
      case SURVEY_QUESTION_TYPE.MultipleChoiceMember:
        return {
          component: CheckBoxAnswer,
          question: question,
          stepNumber: index + 1,
          teamMembers,
        };
      case SURVEY_QUESTION_TYPE.ShortAnswer:
        return { component: TextAnswer, question: question, stepNumber: index + 1, teamMembers };
      case SURVEY_QUESTION_TYPE.SingleChoice:
      default:
        return { component: RatingAnswer, question: question, stepNumber: index + 1, teamMembers };
    }
  });

  const submitSurveyMutation = useSubmitSurvey(() => {
    closeModal();
    setTimeout(() => {
      openModal(<CompletionMessage />);
    }, 150);
  });

  const handleClickSubmit = async () => {
    closeModal();

    const formData = methods.getValues();
    const submitData: SubmitSurveyRequest = {
      reviewerEmail: surveyData.data.reviewerEmail,
      responses: formData.responses,
    };

    submitSurveyMutation.mutate({
      projectId: parseInt(surveyData.data.projectId, 10),
      data: submitData,
    });
  };

  const handleValidationAndSubmit = async () => {
    const formData = methods.getValues();

    try {
      const validatedData = surveyFormSchema.parse(formData);
      onSubmit(validatedData);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        console.error('Validation failed:', error.errors);
      }
      openModal(<ErrorMessage />);
    }
  };

  const onSubmit: SubmitHandler<SurveyFormValues> = () => {
    openModal(<SubmitSurveyMessage handleClickSubmit={handleClickSubmit} />);
  };

  return (
    <div className="container min-h-screen w-full max-w-[1040px] p-4 flex-col-center">
      {showIntroduction ? (
        <SurveyIntroduction setShowIntroduction={setShowIntroduction} />
      ) : (
        <Carousel setApi={setApi} className="relative mx-auto w-full max-w-[1040px]">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[1040px]">
              <CarouselContent>
                {steps.map((step, index) => {
                  const StepComponent = step.component;
                  return (
                    <CarouselItem key={index}>
                      <StepComponent
                        currentStep={currentStep}
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
            {currentStep === steps.length ? (
              <Button
                type="button"
                onClick={handleValidationAndSubmit}
                className="-mt-9 h-[50px] w-[100px] cursor-pointer body8">
                등록하기
              </Button>
            ) : (
              <CarouselNext className="h-10 w-10" />
            )}
          </div>
        </Carousel>
      )}
    </div>
  );
}

// 평가 제출 메시지창
const SubmitSurveyMessage = ({ handleClickSubmit }: { handleClickSubmit: () => void }) => {
  const { closeModal } = useModalStore();

  return (
    <MessageBox
      title={<div>평가를 제출할까요?</div>}
      titleIcon={<MailOpen className="h-6 w-6 stroke-purple-600" />}
      footer={
        <>
          <MessageBox.MessageConfirmButton text="이전으로" onClick={closeModal} isPrimary={false} />
          <MessageBox.MessageConfirmButton text="제출하기" onClick={handleClickSubmit} isPrimary />
        </>
      }
    />
  );
};

// 평가 완료 메시지창
const CompletionMessage = () => {
  return (
    <MessageBox
      title={
        <div className="flex-col-center">
          <div>이제 팀원들이 평가한 내 협업 능력을 분석한</div>
          <div className="flex items-center">
            나의{'\u00A0'}
            <span className="text-purple-500">PRism</span> 을 볼 수 있어요!
          </div>
        </div>
      }
      description="팀원들의 평가 참여도가 높을수록 분석 결과가 정확해요."
      titleIcon={<Sparkles className="h-6 w-6 stroke-purple-600" />}
      footer={
        <Link href="/mypage">
          <MessageBox.MessageConfirmButton text="내 평가 결과 보러가기" isPrimary={true} />
        </Link>
      }
    />
  );
};

// 오류 메시지창(유효성 검사)
const ErrorMessage = () => {
  const { closeModal } = useModalStore();

  return (
    <MessageBox
      title={<div>모든 항목을 작성해주세요.</div>}
      description="누락된 응답이 있습니다. 모든 질문에 답변해주세요."
      titleIcon={<AlertTriangle className="h-6 w-6 stroke-danger-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" onClick={closeModal} isPrimary />}
    />
  );
};
