import { Editor } from '@tiptap/react';
import { PREVIEW_STYLES } from './toolbar/editorStyles';
import { cn } from '@/lib/utils';

interface PreviewProps {
  editor: Editor;
}

export function Preview({ editor }: PreviewProps) {
  return (
    <div
      className={cn('max-h-[500px] min-h-[200px] overflow-y-auto px-3 py-2', PREVIEW_STYLES)}
      dangerouslySetInnerHTML={{
        __html: editor.getHTML(),
      }}
    />
  );
}
