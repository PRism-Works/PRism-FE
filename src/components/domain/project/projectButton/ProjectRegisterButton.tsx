'use client';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ClipboardEdit } from 'lucide-react';

import LoginModal from '../../auth/login/LoginModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';

import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

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

  const handleOpenProject = () => {
    if (!isLoggedIn) {
      alert('로그인하고 프로젝트를 시작해보세요!'); // 임시 alert
      openModal(<LoginModal />);
      return;
    }
    openModal(<ProjectRegisterModal />);
  };

  return (
    <Button
      onClick={handleOpenProject}
      variant={'gradient'}
      className={(cn('h-[60px] w-[250px]'), className)}>
      <ClipboardEdit className="mr-2 h-6 w-6" />
      <p className="body8">{text}</p>
    </Button>
  );
}
