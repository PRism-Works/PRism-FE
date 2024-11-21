import { MailCheck } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import MessageBox from '@/components/common/messageBox/MessageBox';
import ProjectEmailConsentModal from '@/components/domain/auth/privacyPolicy/ProjectEmailConsentModal';

import { useModalStore } from '@/stores/modalStore';

interface EmailConsentConfirmationProps {
  setCurrStep: Dispatch<SetStateAction<number>>;
}
export default function EmailConsentConfirmation({ setCurrStep }: EmailConsentConfirmationProps) {
  const { openModal } = useModalStore();
  const handleEmailConsentConfirm = () => {
    setCurrStep((prev) => prev + 1);
  };
  const handleClickShowTerms = () => {
    openModal(<ProjectEmailConsentModal />);
  };
  return (
    <MessageBox
      title={
        <div>
          팀원들로부터 이메일 수신에 대한
          <br /> 동의를 받았음을 확인합니다.
        </div>
      }
      subTitle={
        <p
          className="my-3 cursor-pointer font-medium text-info underline underline-offset-4"
          onClick={handleClickShowTerms}>
          이메일 수신 이용 약관
        </p>
      }
      titleIcon={<MailCheck className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" onClick={handleEmailConsentConfirm} />}
      showCloseButton={false}
      contentClassName="max-w-[600px]"
    />
  );
}
