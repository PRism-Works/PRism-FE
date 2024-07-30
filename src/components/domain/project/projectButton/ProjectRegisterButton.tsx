'use client';

import LoginModal from '../../auth/login/LoginModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';
import { ClipboardEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      alert('로그인하고 프로젝트를 시작해보세요!'); // 임시 alert
      openModal(<LoginModal />);
      return;
    }
    openModal(<ProjectRegisterModal />);
  };

  return (
    <Button
      onClick={handleOpenProjectRegisterModal}
      variant="gradient"
      className={cn('h-[60px] w-[250px] flex-center', className)}>
      <ClipboardEdit className="mr-2 h-6 w-6" />
      <p className="body8">{text}</p>
    </Button>
  );
}
