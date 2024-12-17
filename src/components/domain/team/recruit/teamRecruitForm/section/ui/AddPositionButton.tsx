import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';

interface AddPositionButtonProps {
  onClick: () => void;
  text: string;
  icon?: LucideIcon;
}

export default function AddPositionButton({
  onClick,
  text,
  icon: Icon = Plus,
}: AddPositionButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'w-full cursor-pointer rounded-[4px] border border-dashed mobile2',
        'text-gray-400 border-gray-300',
        'dark:text-gray-400 dark:border-gray-500 dark:bg-gray-800',
      )}
      onClick={onClick}>
      <Icon className="mr-1 h-4 w-4" />
      {text}
    </Button>
  );
}
