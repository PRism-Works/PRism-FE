'use client';

import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { useModalStore } from '@/stores/modalStore';
import PreviewModal from '@/components/domain/preview/PreviewModal';

interface ImageSaveButtonProps {
  saveType: 'PROFILE' | 'PROJECT';
  projectId?: number;
  className?: string;
}

export default function ImageSaveButton({ saveType, projectId, className }: ImageSaveButtonProps) {
  const openModal = useModalStore((state) => state.openModal);

  const handleClick = () => {
    openModal(<PreviewModal saveType={saveType} projectId={projectId} />);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex cursor-pointer items-center space-x-1 text-gray-800 underline decoration-current underline-offset-4 display5',
        className,
      )}>
      <span>이미지로 저장</span>
      <Download className="h-4 w-4" />
    </div>
  );
}
