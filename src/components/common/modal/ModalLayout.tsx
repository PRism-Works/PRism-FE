import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalLayoutProps {
  title?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  showCloseButton?: boolean;
  preventOutsideClose?: boolean;
  transparentOverlay?: boolean;
  beforeClose?: (closeLayoutModal: () => void) => void;
  afterClose?: () => void;
}

export default function ModalLayout({
  title,
  description,
  children,
  footer,
  contentClassName = '',
  showCloseButton = true,
  preventOutsideClose = true,
  transparentOverlay = false,
  beforeClose,
  afterClose,
}: ModalLayoutProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const hasDescription = !!description;

  // x 버튼이나 layout 바깥 영역 클릭하여 모달을 닫으려 하는 경우,
  // before 함수의 유무를 체크하고 여부에 따라 닫는 로직을 다르게 실행한다.
  const handleClickDiaglogClose = () => {
    if (beforeClose) {
      // beforeClose가 있을 경우, 모달을 닫을 수 있는 handleCloaseModal를 파라미터로 넘겨서
      // 모달을 닫을지 안닫을지의 결졍권을 beforeClose 내부 로직에 맡긴다.
      beforeClose(closeLayoutModal);
    } else {
      // beforeClose가 없다면 모달을 닫는 로직을 실행한다.
      closeLayoutModal();
    }
  };

  const closeLayoutModal = () => {
    closeModal();
    // 모달을 닫은 후 실행할 로직이 있다면 실행
    if (afterClose) {
      afterClose();
    }
  };

  return (
    <Dialog open onOpenChange={handleClickDiaglogClose}>
      <DialogContent
        className={cn(`max-h-[90vh] overflow-y-auto p-11`, contentClassName)}
        transparentOverlay={transparentOverlay}
        onInteractOutside={(event) => {
          if (preventOutsideClose) {
            event.preventDefault();
          }
        }}>
        <DialogHeader className="relative flex-col-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={cn('mobile1', hasDescription ? '' : 'hidden')}>
            {hasDescription ? description : ''}
          </DialogDescription>
          {showCloseButton && (
            <DialogClose asChild>
              <X className="absolute right-0 top-[-5px] h-6 w-6 cursor-pointer stroke-black hover:stroke-[2.5px]" />
            </DialogClose>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

interface ConfirmButtonProps {
  title: string;
  isSmallScreen: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  pending?: boolean;
}

// 전체 너비의 확인 버튼
const ConfirmButton = ({
  title,
  isSmallScreen,
  onClick,
  disabled,
  pending,
}: ConfirmButtonProps) => {
  return (
    <Button
      className={`mt-7 h-[55px] w-full max-w-[420px] bg-purple-500 px-[24px] py-[16px] text-white ${
        isSmallScreen ? 'body8' : 'body6'
      } hover:bg-purple-600`}
      onClick={onClick}
      disabled={disabled}
      pending={pending}>
      {title}
    </Button>
  );
};

ModalLayout.ConfirmButton = ConfirmButton;
