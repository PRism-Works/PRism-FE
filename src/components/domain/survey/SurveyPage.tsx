import { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useSubmitSurvey } from '@/hooks/queries/useSurveyService';
import { SurveyStep, SURVEY_QUESTION_TYPE } from '@/models/survey/surveyModels';
import { surveyQuestions } from '@/lib/surveyQuestions';
import {
  SurveyLinkResponse,
  SubmitSurveyRequest,
  SurveyFormValues,
} from '@/models/survey/surveyApiModels';
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
import { MailOpen } from 'lucide-react';

interface SurveyPageProps {
  surveyData: SurveyLinkResponse;
}

export default function SurveyPage({ surveyData }: SurveyPageProps) {
  const [current, setCurrent] = useState<number>(1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showIntroduction, setShowIntroduction] = useState<boolean>(true);
  const [showSubmitMessageBox, setShowSubmitMessageBox] = useState<boolean>(false);
  const [showCompletionMessageBox, setShowCompletionMessageBox] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const methods = useForm<SurveyFormValues>();

  useEffect(() => {
    setTeamMembers(surveyData.data.revieweeEmails);
  }, [surveyData]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const steps: SurveyStep[] = surveyQuestions.map((question, index) => {
    switch (question.type) {
      case SURVEY_QUESTION_TYPE.Check:
        return {
          component: CheckBoxAnswer,
          question: question,
          stepNumber: index + 1,
          teamMembers,
        };
      case SURVEY_QUESTION_TYPE.Text:
        return { component: TextAnswer, question: question, stepNumber: index + 1, teamMembers };
      case SURVEY_QUESTION_TYPE.Radio:
      default:
        return { component: RatingAnswer, question: question, stepNumber: index + 1, teamMembers };
    }
  });

  const submitSurveyMutation = useSubmitSurvey(() => {
    setShowCompletionMessageBox(true);
  });

  const onSubmit: SubmitHandler<SurveyFormValues> = (data) => {
    console.log(data);
    setShowSubmitMessageBox(true);
  };

  const handleClickSubmit = async () => {
    setShowSubmitMessageBox(false);

    const formData = methods.getValues();
    const submitData: SubmitSurveyRequest = {
      reviewerEmail: 'reviewer@example.com', // 리뷰어 이메일을 설정
      responses: Object.values(formData).map((response) => ({
        questionOrder: response.questionOrder,
        questionType: response.questionType,
        questionCategory:
          response.questionCategory as SubmitSurveyRequest['responses'][number]['questionCategory'],
        responseDetails: response.responseDetails,
      })),
    };

    submitSurveyMutation.mutate({
      projectId: parseInt(surveyData.data.projectId, 10),
      data: submitData,
    });
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
              <Button
                type="button"
                onClick={() => methods.handleSubmit(onSubmit)()}
                className="-mt-9 h-[50px] w-[100px] cursor-pointer body8">
                등록하기
              </Button>
            ) : (
              <CarouselNext className="h-10 w-10" />
            )}
          </div>
        </Carousel>
      )}

      {showSubmitMessageBox && (
        <MessageBox
          title={<div>평가를 제출할까요?</div>}
          titleIcon={<MailOpen className="h-6 w-6 stroke-purple-600" />}
          footer={
            <>
              <MessageBox.MessageConfirmButton
                text="이전으로"
                onClick={() => setShowSubmitMessageBox(false)}
                isPrimary={false}
              />
              <MessageBox.MessageConfirmButton
                text="제출하기"
                onClick={handleClickSubmit}
                isPrimary
              />
            </>
          }
        />
      )}

      {showCompletionMessageBox && (
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
          footer={
            <MessageBox.MessageConfirmButton
              text="내 평가 결과 보러가기"
              isPrimary={true}
              onClick={() => {
                alert('평가 결과 보러가기');
              }}
            />
          }
        />
      )}
    </div>
  );
}
