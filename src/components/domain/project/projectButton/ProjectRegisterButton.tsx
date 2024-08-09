'use client';

import { cn } from '@/lib/utils';
import { ClipboardEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';

import LoginModal from '../../auth/login/LoginModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';

interface ProjectRegisterButtonProps {
  text?: string;
  className?: string;
}

export default function ProjectRegisterButton({
  text = '내 프로젝트 등록하기',
  className,
}: ProjectRegisterButtonProps) {
  const openModal = useModalStore((state) => state.openModal);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleOpenProjectRegisterModal = () => {
    if (!isLoggedIn) {
      openModal(<LoginModal />);
      return;
    }
    openModal(<ProjectRegisterModal />);
  };

  return (
    <Button
      onClick={handleOpenProjectRegisterModal}
      variant="gradient"
      className={cn('h-[45px] w-[210px] flex-center', className)}>
      <ClipboardEdit className="mr-2 h-6 w-6" />
      <p className="body8">{text}</p>
    </Button>
  );
}
