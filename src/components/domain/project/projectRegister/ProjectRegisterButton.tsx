import { Button } from '@/components/ui/button';
import { ClipboardEdit } from 'lucide-react';
import { useModalStore } from '@/stores/modalStore';
import ProjectRegisterModal from '@/components/domain/project/projectRegister/ProjectRegisterModal';
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
      <Button
        onClick={handleOpenProject}
        variant={'default'}
        className="h-[62px] w-[277px] text-white bg-purple-indigo-gradient">
        <ClipboardEdit className="mr-2 h-[30px] w-[30px]" />
        <p className="body2">내 프로젝트 등록하기</p>
      </Button>
    </div>
  );
}
