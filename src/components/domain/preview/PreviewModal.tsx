'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import PreviewModalLayout from '@/components/common/modal/PreviewModalLayout';
import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';
import ProjectPreviewContent from './ProjectPreviewContent';
import ProfilePreviewContent from './ProfilePreviewContent';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import { Share2 } from 'lucide-react';

interface PreviewModalProps {
  saveType: 'PROFILE' | 'PROJECT';
  projectId?: number;
}

export default function PreviewModal({ saveType, projectId }: PreviewModalProps) {
  const userId = useUserStore((state) => state.user?.userId);
  const captureRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);

  // 이미지 저장하기
  const handleSave = async () => {
    if (captureRef.current) {
      try {
        const canvas = await html2canvas(captureRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `${saveType === 'PROJECT' ? 'prism-project' : 'prism-profile'}.png`;
        link.click();
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
        alert('이미지 저장 중 오류가 발생했습니다.');
      }
    }
  };

  // 프로필 또는 프로젝트 상세 페이지 경로 공유하기
  const handleShare = async () => {
    try {
      // 프로젝트, 프로필에 따라 분기처리
      const locationOrigin = window.location.origin;
      const textToShare =
        saveType === 'PROJECT'
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
      {saveType === 'PROJECT' && projectId ? (
        <ProjectPreviewContent projectId={projectId} />
      ) : (
        <ProfilePreviewContent />
      )}
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
