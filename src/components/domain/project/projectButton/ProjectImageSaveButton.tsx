'use client';

import { cn } from '@/lib/utils';
import { Download, Share2 } from 'lucide-react';
import ProjectIntroduceCard from '../projectCard/ProjectIntroduceCard';
import PRismChartExplanationReport from '../../prism/PRismChartExplanationReport';
import RadialChartReport from '../../prism/RadialChartReport';
import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import PreviewModalLayout from '@/components/common/modal/PreviewModalLayout';
import MessageBox from '@/components/common/messgeBox/MessageBox';

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
  const openModal = useModalStore((state) => state.openModal);
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
      openModal(<ShareMessageBox />);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <PreviewModalLayout handleSave={handleSave} handleShare={handleShare} ref={captureRef}>
      <section>
        <ProjectIntroduceCard
          forSaveImage
          userId={userId}
          projectId={projectId}
          fromMyProfile={false}
        />
      </section>
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
        <RadialChartReport projectId={projectId} reportedUserId={userId} fromMyProfile={false} />
      </section>
    </PreviewModalLayout>
  );
};

const ShareMessageBox = () => {
  return (
    <MessageBox
      title="링크가 클립보드에 복사되었습니다."
      titleIcon={<Share2 className="stroke-purple-500" />}
      subTitle="복사된 url을 공유해보세요!"
      footer={<MessageBox.MessageConfirmButton text="확인" />}
    />
  );
};
