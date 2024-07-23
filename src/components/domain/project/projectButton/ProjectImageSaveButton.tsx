'use client';

import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

interface ProjectImageSaveButtonProps {
  className?: string;
}

export default function ProjectImageSaveButton({ className }: ProjectImageSaveButtonProps) {
  // TODO: 이미지 저장하기 로직 구현
  const handleProjectImageSave = () => {
    alert('이미지 저장하기 로직 구현 예정'); // 임시 alert
  };

  return (
    <div
      onClick={handleProjectImageSave}
      className={cn(
        'flex cursor-pointer items-center space-x-1 text-gray-800 underline decoration-current underline-offset-4 display5',
        className,
      )}>
      <span>이미지로 저장</span>
      <Download className="h-4 w-4" />
    </div>
  );
}
