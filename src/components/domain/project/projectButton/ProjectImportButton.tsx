'use client';

import { Button } from '@/components/ui/button';
import { FolderOpen } from 'lucide-react';

export default function ProjectImportButton() {
  // TODO: 지난 프로젝트 불러오기 모달 연결
  const handleOpenImportProject = () => {
    alert('지난 프로젝트 불러오기 모달 연결 예정'); // 임시 alert
  };

  return (
    <Button onClick={handleOpenImportProject} variant="outline" className="h-[45px] w-[210px]">
      <FolderOpen className="mr-1 h-5 w-5" />
      <p className="body8">지난 프로젝트 불러오기</p>
    </Button>
  );
}
