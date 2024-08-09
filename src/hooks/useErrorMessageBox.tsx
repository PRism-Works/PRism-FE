import { useCallback } from 'react';
import { useModal } from './useModal';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import { AlertTriangle } from 'lucide-react';

export default function useErrorMessageBox() {
  const { openModal } = useModal();

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

  return { showErrorMessageBox };
}
