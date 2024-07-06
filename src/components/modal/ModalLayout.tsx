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
        className="max-h-[85vh] overflow-y-auto p-11"
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

const ConfirmButton = ({ title, isSmallScreen }: { title: string; isSmallScreen: boolean }) => {
  return (
    <Button
      className={`mt-7 h-[55px] w-full max-w-[420px] rounded-[10px] bg-purple-200 px-[24px] py-[16px] text-white ${
        isSmallScreen ? 'body8' : 'body7'
      } hover:bg-purple-400`}>
      {title}
    </Button>
  );
};

ModalLayout.ConfirmButton = ConfirmButton;
