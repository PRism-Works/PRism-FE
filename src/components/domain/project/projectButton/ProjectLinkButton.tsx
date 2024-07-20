import { Button } from '@/components/ui/button';
import { ClipboardCopy } from 'lucide-react';

interface ProjectLinkButtonProps {
  projectId: number;
}
export default function ProjectLinkButton({ projectId }: ProjectLinkButtonProps) {
  const handleLinkProject = () => {
    alert(`로그인한 사용자에게 ${projectId} 프로젝트 연동하기(모달창 열기)`);
  };

  return (
    <Button className="h-8" onClick={handleLinkProject}>
      <ClipboardCopy className="h-5 w-5 stroke-[1px]" />
      <span className="ml-2">내 프로젝트에 추가하기</span>
    </Button>
  );
}
