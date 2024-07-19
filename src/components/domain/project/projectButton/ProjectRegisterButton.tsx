'use client';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ClipboardEdit } from 'lucide-react';

import LoginModal from '../../auth/login/LoginModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';

import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

interface ProjectRegisterButtonProps {
  className?: string;
}

export default function ProjectRegisterButton({ className }: ProjectRegisterButtonProps) {
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
    <div className={cn(className)}>
      <Button onClick={handleOpenProject} variant={'gradient'} className="h-[60px] w-[250px]">
        <ClipboardEdit className="mr-2 h-5 w-5" />
        <p className="body6">내 프로젝트 등록하기</p>
      </Button>
    </div>
  );
}
