'use client';

import { useRef, useState } from 'react';

import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';

import PreviewModalLayout from '@/components/common/modal/PreviewModalLayout';
import ProjectPreviewContent from './ProjectPreviewContent';
import ProfilePreviewContent from './ProfilePreviewContent';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import { SAVE_TYPE, type SaveType } from '@/models/preview/previewModels';

import { Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { PageSpinner } from '@/components/common/spinner';

interface PreviewModalProps {
  saveType: SaveType;
  projectId?: number;
}

export default function PreviewModal({ saveType, projectId }: PreviewModalProps) {
  const userId = useUserStore((state) => state.user?.userId);
  const captureRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // 이미지 저장하기
  const handleSave = () => {
    try {
      setIsDownloading(true);
      // 필요한 스타일 및 이미지가 렌더링 되게 setTimeout 추가
      setTimeout(async () => {
        if (captureRef.current) {
          const canvas = await html2canvas(captureRef.current, {
            backgroundColor: 'transparent', // 배경색 투명하게 설정
            scale: 2, // 해상도 증가
          });

          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = `${saveType === SAVE_TYPE.PROJECT ? 'prism-project' : 'prism-profile'}.png`;
          link.click();

          setIsDownloading(false);
        }
      }, 1000);
    } catch (error) {
      console.error('이미지 저장 중 오류 발생:', error);
      alert('이미지 저장 중 오류가 발생했습니다.');
    }
  };

  // 프로필 또는 프로젝트 상세 페이지 경로 공유하기
  const handleShare = async () => {
    try {
      // 프로젝트, 프로필에 따라 분기처리
      const locationOrigin = window.location.origin;
      const textToShare =
        saveType === SAVE_TYPE.PROJECT
          ? `${locationOrigin}/project/user/${userId}/${projectId}`
          : `${locationOrigin}/profile/${userId}`;

      await navigator.clipboard.writeText(textToShare);
      openModal(<ShareMessageBox />);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <PreviewModalLayout handleSave={handleSave} handleShare={handleShare} ref={captureRef}>
      {saveType === SAVE_TYPE.PROJECT && projectId ? (
        <ProjectPreviewContent projectId={projectId} />
      ) : (
        <ProfilePreviewContent />
      )}
      {isDownloading && <PageSpinner />}
    </PreviewModalLayout>
  );
}

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
