import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Link as LinkIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TOOLBAR_BUTTON_STYLES, DIVIDER_STYLES } from '../editorStyles';
import { cn } from '@/lib/utils';

interface LinkButtonProps {
  editor: Editor;
}

export function LinkButton({ editor }: LinkButtonProps) {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const handleSetLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: '_blank' }).run();
      setLinkUrl('');
      setIsLinkMenuOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu open={isLinkMenuOpen} onOpenChange={setIsLinkMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              TOOLBAR_BUTTON_STYLES.base,
              editor.isActive('link') && TOOLBAR_BUTTON_STYLES.active,
            )}>
            <LinkIcon className={TOOLBAR_BUTTON_STYLES.icon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-2">
          <div className="flex gap-2">
            <Input
              placeholder="URL을 입력하세요"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="h-10 w-full"
            />
            <Button onClick={handleSetLink}>확인</Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={DIVIDER_STYLES} />
    </>
  );
}
