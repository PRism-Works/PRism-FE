import { useCallback } from 'react';

import { useModal } from './useModal';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';

/**
 * 지정 콜백함수가 없는 정보성 메시지 박스
 */
export default function useMessageBox() {
  const { openModal } = useModal();

  const showConfirmMessageBox = useCallback(
    (title: string) => {
      openModal(
        <MessageBox
          titleIcon={<AlertCircle className="h-6 w-6 stroke-purple-500" />}
          title={title}
          footer={<MessageBox.MessageConfirmButton text="확인" />}
        />,
      );
    },
    [openModal],
  );

  const showErrorMessageBox = useCallback(
    (title: string = '알 수 없는 오류가 발생했습니다.', subTitle = '다시 시도해 주세요.') => {
      openModal(
        <MessageBox
          titleIcon={<AlertTriangle className="stroke-danger-500 h-6 w-6" />}
          title={title}
          description={subTitle}
          footer={<MessageBox.MessageConfirmButton text="확인" />}
        />,
      );
    },
    [openModal],
  );

  return { showErrorMessageBox, showConfirmMessageBox };
}
