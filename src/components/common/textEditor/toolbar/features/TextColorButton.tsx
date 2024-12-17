import { Editor } from '@tiptap/react';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TOOLBAR_BUTTON_STYLES, TEXT_COLORS, DIVIDER_STYLES } from '../editorStyles';

interface TextColorButtonProps {
  editor: Editor;
}

export function TextColorButton({ editor }: TextColorButtonProps) {
  const handleTextColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={TOOLBAR_BUTTON_STYLES.base}>
            <Palette className={TOOLBAR_BUTTON_STYLES.icon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid grid-cols-4 gap-1 p-1">
            {Object.entries(TEXT_COLORS).map(([key, { color }]) => (
              <button
                key={key}
                className="border-gray-200 h-6 w-6 rounded-md border"
                style={{ backgroundColor: color }}
                onClick={() => handleTextColorChange(color)}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={DIVIDER_STYLES} />
    </>
  );
}
