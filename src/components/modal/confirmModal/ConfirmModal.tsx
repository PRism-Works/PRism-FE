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

interface ConfirmModalProps {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}

export default function ConfirmModal({
  title,
  children,
  footer,
  showCloseButton = true,
}: ConfirmModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto p-11"
        showCloseButton={showCloseButton}>
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
