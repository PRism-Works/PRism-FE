import { Editor } from '@tiptap/react';
import { Highlighter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { TOOLBAR_BUTTON_STYLES, HIGHLIGHT_COLORS } from '../editorStyles';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HighlightButtonProps {
  editor: Editor;
}

export function HighlightButton({ editor }: HighlightButtonProps) {
  const handleHighlightChange = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            TOOLBAR_BUTTON_STYLES.base,
            editor.isActive('highlight') && TOOLBAR_BUTTON_STYLES.active,
          )}>
          <Highlighter className={TOOLBAR_BUTTON_STYLES.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="grid grid-cols-4 gap-1 p-1">
          {Object.entries(HIGHLIGHT_COLORS).map(([key, { color }]) => (
            <button
              key={key}
              className="border-gray-200 h-6 w-6 rounded-md border"
              style={{ backgroundColor: color }}
              onClick={() => handleHighlightChange(color)}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
