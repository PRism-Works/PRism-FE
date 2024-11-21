import { AlertCircle } from 'lucide-react';
import MessageBox from '@/components/common/messageBox/MessageBox';

interface CheckCloseConfirmationProps {
  closeRegisterModal: () => void;
}
export default function CheckCloseConfirmation({
  closeRegisterModal,
}: CheckCloseConfirmationProps) {
  const handleConfirm = () => {
    closeRegisterModal(); // 확인 버튼 클릭 시 프로젝트 등록 모달창을 닫는 콜백함수 실행
  };
  return (
    <MessageBox
      title="내용이 저장되지 않았어요!"
      subTitle="그래도 취소할까요?"
      titleIcon={<AlertCircle className="stroke-purple-500" />}
      footer={
        <>
          <MessageBox.MessageConfirmButton text="취소" isPrimary={false} />
          <MessageBox.MessageConfirmButton text="확인" onClick={handleConfirm} />
        </>
      }
      contentClassName="max-w-[550px]"
    />
  );
}
