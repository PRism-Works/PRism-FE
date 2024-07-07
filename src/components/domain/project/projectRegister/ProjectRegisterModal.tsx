'use client';

import { useState } from 'react';
import ModalLayout from '@/components/modal/ModalLayout';
//import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  LucideFileEdit,
  UserCheck,
  HeartHandshake,
  ArrowLeftCircle,
  ArrowRightCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step {
  title: string;
  subTitle: string;
  icon: JSX.Element;
}

interface HeaderProps {
  currStep: number;
}

interface FooterProps {
  currStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

// Constants
const STEPS: Step[] = [
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

const MAX_STEPS = STEPS.length - 1;

export default function ProjectRegisterModal() {
  //const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const [currStep, setCurrStep] = useState<number>(0);

  const handleNextStep = () => {
    if (currStep < MAX_STEPS) {
      // #20240707.syjang, 다음 스탭 유효성 조건 추가 필요
      setCurrStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currStep > 0) {
      setCurrStep((prev) => prev - 1);
    }
  };

  return (
    <ModalLayout
      title={<Header currStep={currStep} />}
      footer={
        <Footer
          currStep={currStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      }>
      프로젝트 등록 모달 내용들
    </ModalLayout>
  );
}

const Header = ({ currStep }: HeaderProps) => {
  const step = STEPS[currStep];
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 rounded-full bg-black text-white body4 flex-center">
        {currStep + 1}
      </div>
      <div className="w-[283px] flex-col-center">
        <div className="flex justify-center">{step.icon}</div>
        <div className="body8">{step.title}</div>
        <div className="text-purple-800 display5">{step.subTitle}</div>
      </div>
    </div>
  );
};

const Footer = ({ currStep, handlePrevStep, handleNextStep }: FooterProps) => {
  const getButtonClass = (isEnabled: boolean) =>
    `h-10 w-10 stroke-[1.5px] ${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'}`;
  const isLastStep = currStep === MAX_STEPS;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex-1" /> {/* 왼쪽 여백 */}
      <div className="gap-4 flex-center">
        <ArrowLeftCircle
          className={getButtonClass(currStep > 0)}
          onClick={currStep > 0 ? handlePrevStep : undefined}
        />
        <ArrowRightCircle
          className={getButtonClass(currStep < MAX_STEPS)}
          onClick={!isLastStep ? handleNextStep : undefined}
        />
      </div>
      <div className="flex flex-1 justify-end">
        {isLastStep && (
          <Button className="rounded-[10px] px-[16px] py-[10px] text-white mobile1 bg-purple-indigo-gradient">
            등록하기
          </Button>
        )}
      </div>
    </div>
  );
};
