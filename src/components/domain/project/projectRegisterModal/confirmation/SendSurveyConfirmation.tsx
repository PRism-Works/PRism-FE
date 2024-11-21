import { ClipboardCheck, Send } from 'lucide-react';

import MessageBox from '@/components/common/messageBox/MessageBox';

import { useModalStore } from '@/stores/modalStore';
import { useSendSurveyLink } from '@/hooks/queries/useSurveyService';

interface SendSurveyMessageProps {
  projectId: number;
}
// 평가지 보내기 메시지창
export default function SendSurveyMessage({ projectId }: SendSurveyMessageProps) {
  const { openModal, closeModal } = useModalStore();

  const sendSurveyLinkMutation = useSendSurveyLink();

  // '나중에' 버튼 클릭
  const handleClickLater = () => {
    closeModal();
  };

  // '보내기' 버튼 클릭
  const handleClickSendSurvey = async () => {
    try {
      await sendSurveyLinkMutation.mutateAsync({ projectId });
      openModal(<SendSurveyCompleteMessage />);
    } catch (error) {
      console.error('평가지 보내기 실패:', error);
    }
  };

  return (
    <MessageBox
      title="프로젝트가 등록되었어요!"
      titleIcon={<ClipboardCheck className="stroke-purple-500" />}
      subTitle="팀원들에게 평가지를 보낼까요?"
      footer={
        <>
          <MessageBox.MessageConfirmButton
            text="나중에"
            onClick={handleClickLater}
            isPrimary={false}
          />
          <MessageBox.MessageConfirmButton
            text="평가보내기"
            onClick={handleClickSendSurvey}
            isPrimary
          />
        </>
      }
    />
  );
}

const SendSurveyCompleteMessage = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  // '완료' 버튼 클릭
  const handleClickComplete = () => {
    closeModal();
  };

  const renderTitle = () => {
    return (
      <div className="flex-col-center">
        <span>팀원들의 이메일로</span>
        <span>평가지가 전송되었어요!</span>
      </div>
    );
  };
  return (
    <MessageBox
      title={renderTitle()}
      titleIcon={<Send className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="완료" onClick={handleClickComplete} />}
    />
  );
};
