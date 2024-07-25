'use client';

import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/modalStore';
import { ClipboardCopy } from 'lucide-react';
import ProjectLinkModal from '../projectLinkModal/ProjectLinkModal';

interface ProjectLinkButtonProps {
  projectId: number;
}
export default function ProjectLinkButton({ projectId }: ProjectLinkButtonProps) {
  const openModal = useModalStore((state) => state.openModal);
  const handleLinkProject = () => {
    openModal(<ProjectLinkModal projectId={projectId} />);
  };

  return (
    <Button className="h-8" onClick={handleLinkProject}>
      <ClipboardCopy className="h-5 w-5 stroke-[1px]" />
      <span className="ml-2">내 프로젝트에 추가하기</span>
    </Button>
  );
}
