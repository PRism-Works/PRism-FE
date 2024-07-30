import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modalStore';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TermsModalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function TermsModalLayout({ title, children }: TermsModalLayoutProps) {
  const { closeModal } = useModalStore();

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent
        className={cn(
          'relative flex flex-col items-start justify-center rounded-[5px] p-6',
          'max-h-[80vh] w-[70vw]',
        )}>
        <DialogClose asChild>
          <X className="absolute right-4 top-6 h-6 w-6 cursor-pointer stroke-black hover:stroke-[2.5px]" />
        </DialogClose>
        <DialogHeader className="flex w-full items-start">
          <DialogTitle className="mt-2 text-left display6">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 w-full overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
