'use client';

import { useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useCreateProject, useUpdateProject } from '@/hooks/queries/useProjectService';

import { Form } from '@/components/ui/form';
import { HeartHandshake, LucideFileEdit, UserCheck } from 'lucide-react';

import type { ProjectForm, ProjectRegisterHeaderStep } from '@/models/project/projectModels';

import ModalLayout from '@/components/common/modal/ModalLayout';
import ProgressBar from '@/components/common/progressBar/ProgressBar';
import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import ProjectRegisterHeader from './layout/ProjectRegisterHeader';
import ProjectRegisterFooter from './layout/ProjectRegisterFooter';

import { PageSpinner } from '@/components/common/spinner';
import { formatDateToYYYYMMDDHHmmss } from '@/lib/dateTime';

import CheckCloseConfirmation from './confirmation/CheckCloseConfirmation';
import EmailConsentConfirmation from './confirmation/EmailConsentConfirmation';

import useProjectForm from './hooks/useProjectForm';
import useProjectMutationSuccess from './hooks/useProjectMutationSuccess';

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
  isRecruit?: boolean;
  projectId?: number;
  defaultData?: ProjectForm;
}

export default function ProjectRegisterModal({
  isEdit = false, // 수정 모드인지 여부
  isRecruit = false, // 팀 빌딩 모드인지 여부
  projectId,
  defaultData,
}: ProjectRegisterModalProps) {
  const { openModal } = useModalStore();
  const [currStep, setCurrStep] = useState<number>(0);

  const { formMethods } = useProjectForm(defaultData);
  const { handleProjectCreateSuccess, handleProjectUpdateSuccess } =
    useProjectMutationSuccess(isRecruit);
  const createMutation = useCreateProject(handleProjectCreateSuccess);
  const updateMutation = useUpdateProject(handleProjectUpdateSuccess);

  const handleNextStep = async () => {
    if (currStep === MAX_STEP) return;

    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    let result = false;
    if (currStep === 0) {
      result = await formMethods.trigger(['projectName', 'startDate', 'endDate']);
    } else if (currStep === 1) {
      result = await formMethods.trigger(['members']);

      // Step2일 경우, 이메일 수신 동의 메시지 박스를 띄운다.
      // 등록이든 수정이든, 이메일이 바뀔 수 있으니 항상 띄우게 함.
      if (result) {
        openModal(<EmailConsentConfirmation setCurrStep={setCurrStep} />);
        return;
      }
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

  const checkCloseProjectResgisterModal = (closeRegisterModal: () => void) => {
    openModal(<CheckCloseConfirmation closeRegisterModal={closeRegisterModal} />);
  };

  return (
    <ModalLayout
      beforeClose={checkCloseProjectResgisterModal}
      contentClassName="max-w-[500px]"
      title={<ProjectRegisterHeader currStep={currStep} STEPS={STEPS} />}
      footer={
        <ProjectRegisterFooter
          currStep={currStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleExternalSubmit={handleExternalSubmit}
          isEdit={isEdit}
          isPending={updateMutation.isPending || createMutation.isPending}
          MAX_STEP={MAX_STEP}
        />
      }>
      <ProgressBar percent={((currStep + 1) / (MAX_STEP + 1)) * 100} />
      <div className="bg-gray-50 mb-[6px] h-[430px] w-full overflow-auto scroll-smooth rounded-[10px] p-[18px] scrollbar-thin">
        <Form {...formMethods}>
          <form>
            {currStep === 0 && <Step1 />}
            {currStep === 1 && <Step2 />}
            {currStep === 2 && <Step3 isEdit={isEdit} />}
          </form>
        </Form>
      </div>
      {createMutation.isPending && <PageSpinner />}
    </ModalLayout>
  );
}
