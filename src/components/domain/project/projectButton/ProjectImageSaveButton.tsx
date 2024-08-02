'use client';

import { cn } from '@/lib/utils';
import { Download, Share } from 'lucide-react';
import ProjectIntroduceCard from '../projectCard/ProjectIntroduceCard';
import PRismChartExplanationReport from '../../prism/PRismChartExplanationReport';
import RadialChartReport from '../../prism/RadialChartReport';
import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';
import PrismLogo from '@/assets/logo/logo-combine.svg';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';

interface ProjectImageSaveButtonProps {
  saveType: 'PROFILE' | 'PROJECT';
  projectId?: number;
  className?: string;
}

export default function ProjectImageSaveButton({
  saveType,
  projectId,
  className,
}: ProjectImageSaveButtonProps) {
  const openModal = useModalStore((state) => state.openModal);

  const handleProjectImageSave = () => {
    if (saveType === 'PROFILE') {
      console.log('profile');
    } else if (saveType === 'PROJECT' && projectId) {
      openModal(<PreviewSaveImageProject projectId={projectId} />);
    }
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

interface PreviewSaveImageProjectProps {
  projectId: number;
}
const PreviewSaveImageProject = ({ projectId }: PreviewSaveImageProjectProps) => {
  const userId = useUserStore((state) => state.user?.userId);
  const captureRef = useRef<HTMLDivElement>(null);
  const handleSave = async () => {
    if (captureRef.current) {
      try {
        const canvas = await html2canvas(captureRef.current);

        // 캔버스를 이미지로 변환
        const image = canvas.toDataURL('image/png');

        // 다운로드 링크 생성 및 클릭
        const link = document.createElement('a');
        link.href = image;
        link.download = `prism-${projectId}.png`;
        link.click();
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
        alert('이미지 저장 중 오류가 발생했습니다.');
      }
    }
  };

  const handleShare = async () => {
    try {
      // 공유 주소 (로컬, 버셀, 스위그 배포 시 수정을 안하기 위해 window.location에서 가져옴)
      const textToShare = `${window.location.origin}/project/user/${userId}/${projectId}`;
      await navigator.clipboard.writeText(textToShare);
      alert('링크가 클립보드에 복사되었습니다! 해당 url을 공유해보세요!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <ModalLayout
      title={
        <div className="gap-2 flex-center">
          미리보기
          <InformationTooltip message="이미지 저장 최적화를 위해 디자인이 실제와 다를 수 있습니다." />
        </div>
      }
      showCloseButton={false}
      preventOutsideClose={false}
      contentClassName="min-w-[1100px]">
      <div className="mt-7 flex gap-4 flex-col-center">
        <div className="flex w-full items-center justify-end gap-4 body8">
          <span className="cursor-pointer gap-1 flex-center" onClick={handleSave}>
            저장하기 <Download />
          </span>
          <span className="cursor-pointer gap-1 flex-center" onClick={handleShare}>
            공유하기 <Share />
          </span>
        </div>
        <div ref={captureRef} className="flex w-full flex-col gap-10 rounded-2xl bg-gray-50 p-9">
          <header className="w-full gap-8 flex-col-center">
            <PrismLogo className="mb-4 w-[150px]" />
            <ProjectIntroduceCard
              forSaveImage
              userId={userId}
              projectId={projectId}
              fromMyProfile={false}
            />
          </header>
          <section className="flex flex-col gap-4">
            <h2 className="text-gray-900 body6">PRism</h2>
            <PRismChartExplanationReport
              fromMyProfile={false}
              projectId={projectId}
              reportedUserId={userId}
            />
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-gray-900 body6">PRism 분석 리포트</h2>
            <RadialChartReport
              projectId={projectId}
              reportedUserId={userId}
              fromMyProfile={false}
            />
          </section>
          <footer className="gap-3 flex-center">
            <span className="text-gray-700 body6">PRism</span>
            <span className="text-gray-400 display5">©PRism. All rights reserved.</span>
          </footer>
        </div>
      </div>
    </ModalLayout>
  );
};
