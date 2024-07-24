'use client';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useId, useState } from 'react';
import { useUpdateMyProjectVisibility } from '@/hooks/queries/useProjectService';

interface ProjectVisibilityButtonProps {
  projectId: number;
  initialVisibility: boolean;
}

export default function ProjectVisibilityButton({
  projectId,
  initialVisibility,
}: ProjectVisibilityButtonProps) {
  const projectVisibilityId = useId();
  const [visibility, setVisibility] = useState<boolean>(initialVisibility);

  // mutaion의 callback으로 넘겨, 성공시에만 상태가 바뀌게 한다.
  const handleUpdateVisibility = (checked: boolean) => {
    setVisibility(checked);
  };

  const visibilityMuataion = useUpdateMyProjectVisibility(handleUpdateVisibility);
  const handleClickSwitch = (checked: boolean) => {
    visibilityMuataion.mutate({ projectId, visibility: checked });
  };
  // 프로젝트 요악 카드의 클릭 이벤트인 상세 조회까지의 이벤트 흐름을 막기 위해 추가
  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className="flex items-center gap-2" onClick={handleStopPropagation}>
      <Switch id={projectVisibilityId} checked={visibility} onCheckedChange={handleClickSwitch} />
      <Label htmlFor={projectVisibilityId} className={cn('mobile2', visibility || 'text-gray-400')}>
        {visibility ? '프로젝트 공개' : '프로젝트 비공개'}
      </Label>
    </div>
  );
}
