import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TOOLBAR_BUTTON_STYLES } from './editorStyles';

interface ToolbarButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  icon: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function ToolbarButton({
  onClick,
  isActive,
  icon,
  className,
  'aria-label': ariaLabel,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={cn(
        TOOLBAR_BUTTON_STYLES.base,
        isActive && TOOLBAR_BUTTON_STYLES.active,
        className,
      )}
      aria-label={ariaLabel}>
      {icon}
    </Button>
  );
}
