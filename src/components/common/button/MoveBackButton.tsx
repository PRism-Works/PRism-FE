'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface MoveBackButtonProps {
  text?: string;
  className?: string;
}

// useRouter를 활용한 뒤로가기 버튼 (마이페이지 수정, 프로젝트 수정 등에서 재사용)
export default function MoveBackButton({ text = '취소', className }: MoveBackButtonProps) {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} className={className}>
      {text}
    </Button>
  );
}
