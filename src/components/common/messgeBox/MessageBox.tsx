'use client';

import ModalLayout from '@/components/common/modal/ModalLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/stores/modalStore';

// 제목, 버튼 필수
interface MessageBoxProps {
  title: React.ReactNode;
  titleIcon?: JSX.Element;
  subTitle?: React.ReactNode; // with Color
  description?: string;
  footer: React.ReactNode;
  showCloseButton?: boolean;
  contentClassName?: string;
}

export default function MessageBox({
  title,
  titleIcon,
  subTitle,
  description = '',
  footer,
  showCloseButton = true,
  contentClassName = '',
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
        contentClassName={cn('max-w-[500px] px-[50px]', contentClassName)}
        transparentOverlay={true}
        footer={<div className="mt-5 w-full gap-1 flex-center">{footer}</div>}
        showCloseButton={showCloseButton}
      />
    </div>
  );
}

interface MessageBoxButtonProps {
  text: string;
  onClick?: () => void;
  isPrimary?: boolean; // 보라색 강조 버튼 여부
  isPending?: boolean;
}

const MessageConfirmButton = ({
  text,
  onClick,
  isPrimary = true,
  isPending = false,
}: MessageBoxButtonProps) => {
  const { closeModal } = useModalStore();
  const handleClick = () => {
    closeModal();
    if (onClick) onClick();
  };
  return (
    <Button variant={isPrimary ? 'default' : 'outline'} onClick={handleClick} pending={isPending}>
      {text}
    </Button>
  );
};

MessageBox.MessageConfirmButton = MessageConfirmButton;
