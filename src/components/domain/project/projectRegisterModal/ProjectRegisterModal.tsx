'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';

import { HeartHandshake, LucideFileEdit, UserCheck } from 'lucide-react';

import ModalLayout from '@/components/common/modal/ModalLayout';
import ProgressBar from '@/components/common/progressBar/ProgressBar';

//import { useMediaQuery } from '@/hooks/useMediaQuery';

import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import ProjectRegisterHeader from './layout/ProjectRegisterHeader';
import ProjectRegisterFooter from './layout/ProjectRegisterFooter';

import {
  type ProjectForm,
  type ProjectRegisterHeaderStep,
  ProjectFormSchema,
} from '@/models/projectModels';

const STEPS: ProjectRegisterHeaderStep[] = [
  {
    title: '프로젝트에 대한 정보를 알려주세요!',
    subTitle: '팀원끼리 검색이 편해져요',
    icon: <LucideFileEdit className="h-6 w-6" />,
  },
  {
    title: '팀원들에 대한 정보를 알려주세요!',
    subTitle: '모든 팀원을 평가해 줄 수 있어요',
    icon: <UserCheck className="h-6 w-6" />,
  },
  {
    title: '프로젝트 산출물 정보를 알려주세요!',
    subTitle: '신뢰도 높은 프로필을 만드는 데 필요해요',
    icon: <HeartHandshake className="h-6 w-6" />,
  },
];

const MAX_STEP = STEPS.length - 1;

export default function ProjectRegisterModal() {
  //const isSmallScreen = useMediaQuery('(max-width: 430px)');
  // 기능 붙일 때 추가 예정
  const formMethods = useForm<ProjectForm>({
    mode: 'onChange',
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      project_name: '',
      organization_name: '',
      start_date: '2024-07-07',
      end_date: '2024-07-07',
      members: [{ name: 'User1', email: 'rkfhadlwhgdk@naver.com', role: '개발자' }], // 로그인 한 사용자 기본 세팅
    },
  });
  const [currStep, setCurrStep] = useState<number>(0);

  const handleNextStep = async () => {
    if (currStep === MAX_STEP) return;

    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    let result = false;
    if (currStep === 0) {
      result = await formMethods.trigger(['project_name', 'start_date', 'end_date']);
    } else if (currStep === 1) {
      result = await formMethods.trigger(['members']);
    }
    if (result && currStep < MAX_STEP) {
      setCurrStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currStep > 0) {
      setCurrStep((prev) => prev - 1);
    }
  };

  const handleExternalSubmit = () => {
    formMethods.handleSubmit((data: ProjectForm) => {
      alert(JSON.stringify(data));
    })();
  };

  // isValid={true} 값 수정 필요
  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title={<ProjectRegisterHeader currStep={currStep} STEPS={STEPS} />}
      footer={
        <ProjectRegisterFooter
          currStep={currStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleExternalSubmit={handleExternalSubmit}
          isValid={true}
          MAX_STEP={MAX_STEP}
        />
      }>
      <div className="mb-[6px] h-[430px] w-full overflow-auto rounded-[10px] bg-gray-50 p-[18px]">
        <Form {...formMethods}>
          <FormProvider {...formMethods}>
            <form>
              {currStep === 0 && <Step1 />}
              {currStep === 1 && <Step2 />}
              {currStep === 2 && <Step3 />}
            </form>
          </FormProvider>
        </Form>
      </div>
    </ModalLayout>
  );
}
