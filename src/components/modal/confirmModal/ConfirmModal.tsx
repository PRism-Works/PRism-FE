import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modalStore';

interface ConfirmModalProps {
  title?: string;
  children?: React.ReactNode;
}

export default function ConfirmModal({ title, children }: ConfirmModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="p-11">
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
