'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderOpen } from 'lucide-react';

export default function GoProjectLinkButton() {
  return (
    <Link href="/project/link">
      <Button variant="outline" className="h-[45px] w-[210px]">
        <FolderOpen className="mr-1 h-5 w-5" />
        <p className="body8">지난 프로젝트 불러오기</p>
      </Button>
    </Link>
  );
}
