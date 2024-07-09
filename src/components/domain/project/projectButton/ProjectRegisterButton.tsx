'use client';

import { Button } from '@/components/ui/button';
import { ClipboardEdit } from 'lucide-react';
import { useModalStore } from '@/stores/modalStore';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';
import { cn } from '@/lib/utils';

interface ProjectRegisterButtonProps {
  className?: string;
}

export default function ProjectRegisterButton({ className }: ProjectRegisterButtonProps) {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenProject = () => {
    openModal(<ProjectRegisterModal />);
  };

  return (
    <div className={cn(className)}>
      <Button onClick={handleOpenProject} variant={'gradient'} className="h-[60px] w-[250px]">
        <ClipboardEdit className="mr-2 h-[22px] w-[22px]" />
        <p className="body6">내 프로젝트 등록하기</p>
      </Button>
    </div>
  );
}
