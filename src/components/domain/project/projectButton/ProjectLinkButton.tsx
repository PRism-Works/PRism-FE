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
    // #20240722.syjang, api 호출 로직 추가 예정
    console.log(
      `${projectId}번 프로젝트의 멤버 리스트 조회하는 api 호출하며 ProjectLinkModal에 데이터 넘기기`,
    );
    openModal(<ProjectLinkModal />);
  };

  return (
    <Button className="h-8" onClick={handleLinkProject}>
      <ClipboardCopy className="h-5 w-5 stroke-[1px]" />
      <span className="ml-2">내 프로젝트에 추가하기</span>
    </Button>
  );
}
