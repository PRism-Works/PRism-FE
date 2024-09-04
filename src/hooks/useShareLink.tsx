'use client';

import { Share2 } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';

import { SAVE_TYPE, type SaveType } from '@/models/preview/previewModels';

import useMessageBox from './useMessageBox';

import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';

const useShareLink = (saveType: SaveType, projectId: number | undefined) => {
  const userId = useUserStore((state) => state.user?.userId);
  const openModal = useModalStore((state) => state.openModal);
  const { showErrorMessageBox } = useMessageBox();

  // 프로필 또는 프로젝트 상세 페이지 경로 공유하기
  const handleShareLink = async () => {
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
      showErrorMessageBox('클립보드 복사에 실패했습니다.');
    }
  };

  return { handleShareLink };
};

export default useShareLink;

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
