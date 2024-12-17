'use client';

import { useState, forwardRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { Toolbar } from './toolbar/Toolbar';
import { Preview } from './Preview';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRichTextEditor } from './hooks/useRichTextEditor';
import { EDITOR_CONTAINER_STYLES, EDITOR_CONTENT_STYLES } from './toolbar/editorStyles';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, onChange, onBlur, name, error, placeholder = '', className }, ref) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const editor = useRichTextEditor({
      value,
      onChange,
      onBlur,
      placeholder,
    });

    const togglePreviewMode = () => setIsPreviewMode((prev) => !prev);

    if (!editor) {
      return null;
    }

    return (
      <div
        className={cn(
          EDITOR_CONTAINER_STYLES.base,
          error && EDITOR_CONTAINER_STYLES.error,
          EDITOR_CONTAINER_STYLES.focus,
          className,
        )}>
        <div className="flex items-center justify-between border-b border-gray-400 px-2 dark:border-gray-500">
          <Toolbar editor={editor} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-2 text-sm"
            onClick={togglePreviewMode}
            aria-label={isPreviewMode ? '편집 모드로 전환' : '미리보기 모드로 전환'}>
            {isPreviewMode ? 'Write' : 'Preview'}
          </Button>
        </div>

        {isPreviewMode ? (
          <Preview editor={editor} />
        ) : (
          <EditorContent
            editor={editor}
            name={name}
            ref={ref}
            onBlur={onBlur}
            className={cn(
              EDITOR_CONTENT_STYLES.base,
              EDITOR_CONTENT_STYLES.placeholder,
              EDITOR_CONTENT_STYLES.media,
            )}
          />
        )}
      </div>
    );
  },
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
