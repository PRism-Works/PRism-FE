'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useId, useState } from 'react';

interface ProjectVisibilityButtonProps {
  projectId: number;
  initialVisibility: boolean;
}
/**
 *
 * @param param0
 * @returns
 */
export default function ProjectVisibilityButton({
  projectId,
  initialVisibility,
}: ProjectVisibilityButtonProps) {
  const projectVisibilityId = useId();
  const [visibility, setVisibility] = useState<boolean>(initialVisibility);
  const toggleVisibility = (checked: boolean) => {
    setVisibility(checked);
    alert(`로그인 유저의 ${projectId}번 프로젝트 ${checked}로 변경하는 api 호출하기`);
  };
  // 프로젝트 요악 카드의 클릭 이벤트인 상세 조회까지의 이벤트 흐름을 막기 위해 추가
  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className="flex items-center gap-2" onClick={handleStopPropagation}>
      <Switch id={projectVisibilityId} checked={visibility} onCheckedChange={toggleVisibility} />
      <Label htmlFor={projectVisibilityId} className={cn('mobile2', visibility || 'text-gray-400')}>
        {visibility ? '프로젝트 공개' : '프로젝트 비공개'}
      </Label>
    </div>
  );
}
