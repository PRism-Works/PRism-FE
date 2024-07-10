import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';

interface ModalLayoutProps {
  title?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}

export default function ModalLayout({
  title,
  description,
  children,
  footer,
  showCloseButton = true,
}: ModalLayoutProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const hasDescription = !!description;
  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto p-11"
        showCloseButton={showCloseButton}>
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={`${hasDescription ? '' : 'hidden'}`}>
            {hasDescription ? description : ''}
          </DialogDescription>
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
