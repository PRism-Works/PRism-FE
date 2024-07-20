'use client';

import ModalLayout from '@/components/common/modal/ModalLayout';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/modalStore';

// 제목, 버튼 필수
interface MessageBoxProps {
  title: React.ReactNode;
  titleIcon?: JSX.Element;
  subTitle?: string; // with Color
  description?: string;
  footer: React.ReactNode;
}

export default function MessageBox({
  title,
  titleIcon,
  subTitle,
  description = '',
  footer,
}: MessageBoxProps) {
  return (
    <div className="shadow-custom-6px">
      <ModalLayout
        title={
          <div className="flex-col-center">
            {titleIcon && <div className="mb-3 flex justify-center">{titleIcon}</div>}
            <div className="body2">{title}</div>
            {subTitle && <div className="mt-1 text-purple-800 display4">{subTitle}</div>}
          </div>
        }
        description={description}
        contentClassName="max-w-[500px] px-[50px]"
        transparentOverlay={true}
        footer={<div className="mt-5 w-full gap-1 flex-center">{footer}</div>}
      />
    </div>
  );
}

interface MessageBoxButtonProps {
  text: string;
  onClick: () => void;
  isPrimary?: boolean; // 보라색 강조 버튼 여부
}

const MessageConfirmButton = ({ text, onClick, isPrimary = true }: MessageBoxButtonProps) => {
  const { closeModal } = useModalStore();
  const handleClick = () => {
    closeModal();
    onClick();
  };
  return (
    <Button variant={isPrimary ? 'default' : 'outline'} onClick={handleClick}>
      {text}
    </Button>
  );
};

MessageBox.MessageConfirmButton = MessageConfirmButton;
