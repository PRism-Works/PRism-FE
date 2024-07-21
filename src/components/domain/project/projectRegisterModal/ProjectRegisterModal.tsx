'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  type ProjectForm,
  type ProjectRegisterHeaderStep,
  ProjectFormSchema,
} from '@/models/project/projectModels';

import { Form } from '@/components/ui/form';

import { ClipboardCheck, HeartHandshake, LucideFileEdit, Send, UserCheck } from 'lucide-react';

import ModalLayout from '@/components/common/modal/ModalLayout';
import ProgressBar from '@/components/common/progressBar/ProgressBar';
import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import ProjectRegisterHeader from './layout/ProjectRegisterHeader';
import ProjectRegisterFooter from './layout/ProjectRegisterFooter';

import { PageSpinner } from '@/components/common/spinner';
import MessageBox from '@/components/common/messgeBox/MessageBox';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useModalStore } from '@/stores/modalStore';
import { useUserStore } from '@/stores/userStore';

import { useCreateProject, useUpdateProject } from '@/hooks/queries/useProjectService';

import { formatDateToYYYYMMDDHHmmss } from '@/lib/dateTime';

const STEPS: ProjectRegisterHeaderStep[] = [
  {
    title: '프로젝트에 대한 정보를 알려주세요!',
    subTitle: '팀원끼리 검색이 편해져요.',
    icon: <LucideFileEdit className="h-6 w-6" />,
  },
  {
    title: '팀원들에 대한 정보를 알려주세요!',
    subTitle: '모든 팀원을 평가해 줄 수 있어요.',
    icon: <UserCheck className="h-6 w-6" />,
  },
  {
    title: '프로젝트 산출물 정보를 알려주세요!',
    subTitle: '신뢰도 높은 프로필을 만드는 데 필요해요.',
    icon: <HeartHandshake className="h-6 w-6" />,
  },
];

const MAX_STEP = STEPS.length - 1;

interface ProjectRegisterModalProps {
  isEdit?: boolean;
  projectId?: number;
  defaultData?: ProjectForm;
}

export default function ProjectRegisterModal({
  isEdit = false, // 수정 모드인지 여부
  projectId,
  defaultData,
}: ProjectRegisterModalProps) {
  const [currStep, setCurrStep] = useState<number>(0);
  const { openModal, closeModal } = useModalStore();
  const userData = useUserStore((state) => state.user);

  // 프로젝트 저장 성공 콜백함수
  const handleProjectCreateSuccess = () => {
    closeModal();
    setTimeout(() => {
      openModal(<SendSurveyMessage />);
    }, 150);
  };
  // 프로젝트 수정 성공 콜백함수
  const handleProjectUpdateSuccess = () => {
    closeModal();
    alert('프로젝트가 수정되었습니다.');
  };

  const createMutation = useCreateProject(handleProjectCreateSuccess);
  const updateMutation = useUpdateProject(handleProjectUpdateSuccess);

  const formMethods = useForm<ProjectForm>({
    mode: 'onChange',
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      projectName: defaultData?.projectName || '',
      organizationName: defaultData?.organizationName || '',
      startDate: defaultData?.startDate || null,
      endDate: defaultData?.startDate || null,
      members: defaultData?.members || [
        {
          // 로그인 한 사용자 기본 세팅
          name: userData?.name || '',
          email: userData?.email || '',
          roles: userData?.roles || [],
        },
        {
          name: '',
          email: '',
          roles: [],
        },
      ],
      projectUrlLink: defaultData?.projectUrlLink || '',
      projectDescription: defaultData?.projectDescription || '',
      skills: defaultData?.skills || [],
      categories: defaultData?.categories || [],
    },
  });

  const handleNextStep = async () => {
    if (currStep === MAX_STEP) return;

    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    let result = false;
    if (currStep === 0) {
      result = await formMethods.trigger(['projectName', 'startDate', 'endDate']);
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
      const defaultDate = new Date();
      const mutationData = {
        ...data,
        startDate: formatDateToYYYYMMDDHHmmss(data.startDate || defaultDate),
        endDate: formatDateToYYYYMMDDHHmmss(data.endDate || defaultDate),
        memberCount: data.members.length,
      };

      // 현재 수정모드인지에 따라 다른 mutate 실행
      if (isEdit && projectId) {
        updateMutation.mutate({ projectId, data: mutationData });
      } else {
        createMutation.mutate(mutationData);
      }
    })();
  };

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
          MAX_STEP={MAX_STEP}
        />
      }>
      <ProgressBar percent={((currStep + 1) / (MAX_STEP + 1)) * 100} />
      <div className="mb-[6px] h-[430px] w-full overflow-auto scroll-smooth rounded-[10px] bg-gray-50 p-[18px]">
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
      {createMutation.isPending && <PageSpinner />}
    </ModalLayout>
  );
}

// 평가지 보내기 메시지창
const SendSurveyMessage = () => {
  const { openModal, closeModal } = useModalStore();

  // '나중에' 버튼 클릭
  const handleClickLater = () => {
    closeModal();
  };
  // '보내기 버튼 클릭
  const handleClickSendSurvey = () => {
    // 평가지 보내기 api 호출
    // 평가지 전송 완료 메시지박스 띄우기
    openModal(<SendSurveyCompleteMessage />);
  };
  return (
    <MessageBox
      title="프로젝트가 등록되었어요!"
      titleIcon={<ClipboardCheck className="stroke-purple-500" />}
      subTitle="팀원들에게 평가지를 보낼까요?"
      footer={
        <>
          <MessageBox.MessageConfirmButton
            text="나중에"
            onClick={handleClickLater}
            isPrimary={false}
          />
          <MessageBox.MessageConfirmButton
            text="평가보내기"
            onClick={handleClickSendSurvey}
            isPrimary
          />
        </>
      }
    />
  );
};

const SendSurveyCompleteMessage = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  // '완료' 버튼 클릭
  const handleClickComplete = () => {
    closeModal();
  };

  const renderTitle = () => {
    return (
      <div className="flex-col-center">
        <span>팀원들의 이메일로</span>
        <span>평가지가 전송되었어요!</span>
      </div>
    );
  };
  return (
    <MessageBox
      title={renderTitle()}
      titleIcon={<Send className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="완료" onClick={handleClickComplete} />}
    />
  );
};
