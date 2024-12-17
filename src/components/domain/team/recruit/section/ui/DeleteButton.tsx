import { cn } from '@/lib/utils';
import { XCircle } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <XCircle
      className={cn(
        'h-6 w-6',
        'stroke-[1px]',
        'text-gray-500 hover:text-gray-700',
        'dark:text-gray-400 dark:hover:text-gray-200',
        'cursor-pointer',
      )}
      onClick={onClick}
    />
  );
}
