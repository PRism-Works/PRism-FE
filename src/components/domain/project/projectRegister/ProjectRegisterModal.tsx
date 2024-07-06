'use client';

import ModalLayout from '@/components/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ProjectRegisterModal() {
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  return (
    <ModalLayout
      title="프로젝트 등록"
      footer={<ModalLayout.ConfirmButton title="프로젝트 등록" isSmallScreen={isSmallScreen} />}>
      프로젝트 등록 모달 내용들
    </ModalLayout>
  );
}
