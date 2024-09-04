'use client';

import { SAVE_TYPE, SaveType } from '@/models/preview/previewModels';
import html2canvas from 'html2canvas';
import { RefObject, useState } from 'react';
import useMessageBox from './useMessageBox';

const useSaveImage = <T extends HTMLElement>(saveType: SaveType, captureRef: RefObject<T>) => {
  const [isImageDownloading, setIsImageDownloading] = useState<boolean>(false);
  const { showErrorMessageBox } = useMessageBox();

  // 이미지 저장하기
  const handleSaveImage = () => {
    try {
      setIsImageDownloading(true);
      // 필요한 스타일 및 이미지가 렌더링 되게 setTimeout 추가
      setTimeout(async () => {
        setIsImageDownloading(false);
        // 페이지 로딩창 끄고 state 변경 적용을 위해 큐에 promise 추가
        await new Promise((resolve) => setTimeout(resolve, 200));

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
        }
      }, 1000);
    } catch (error) {
      console.error('이미지 저장 중 오류 발생:', error);
      showErrorMessageBox('이미지 저장 중 오류가 발생했습니다.');
    }
  };

  return { handleSaveImage, isImageDownloading };
};

export default useSaveImage;
