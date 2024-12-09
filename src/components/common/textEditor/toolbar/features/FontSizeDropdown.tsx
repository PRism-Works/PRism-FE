import { Editor } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FONT_SIZE_OPTIONS, DIVIDER_STYLES } from '../editorStyles';
import { cn } from '@/lib/utils';

interface FontSizeDropdownProps {
  editor: Editor;
}

export function FontSizeDropdown({ editor }: FontSizeDropdownProps) {
  const getCurrentFontSize = () => {
    const entry = Object.entries(FONT_SIZE_OPTIONS).find(([, className]) =>
      editor.isActive('textStyle', { size: className }),
    );
    return entry?.[0] || 'Medium';
  };

  const handleFontSizeChange = (className: string) => {
    editor.chain().focus().setMark('textStyle', { size: className }).run();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="display8 h-8 w-24 px-3">
            {getCurrentFontSize()}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.entries(FONT_SIZE_OPTIONS).map(([size, className]) => (
            <DropdownMenuItem
              key={className}
              className={cn(
                className,
                editor.isActive('textStyle', { size: className }) && 'bg-purple-500/20',
              )}
              onClick={() => handleFontSizeChange(className)}>
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={DIVIDER_STYLES} />
    </>
  );
}
