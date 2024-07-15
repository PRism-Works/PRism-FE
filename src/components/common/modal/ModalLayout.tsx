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
}: ModalLayoutProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const hasDescription = !!description;
  return (
    <Dialog open onOpenChange={closeModal}>
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
}

// 전체 너비의 확인 버튼
const ConfirmButton = ({ title, isSmallScreen, onClick, disabled }: ConfirmButtonProps) => {
  return (
    <Button
      className={`mt-7 h-[55px] w-full max-w-[420px] bg-purple-500 px-[24px] py-[16px] text-white ${
        isSmallScreen ? 'body8' : 'body6'
      } hover:bg-purple-600`}
      onClick={onClick}
      disabled={disabled}>
      {title}
    </Button>
  );
};

ModalLayout.ConfirmButton = ConfirmButton;
