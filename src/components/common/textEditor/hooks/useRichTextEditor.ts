import { ForwardedRef } from 'react';
import { useEditor } from '@tiptap/react';
import { EDITOR_EXTENSIONS } from '../extensions';

interface UseRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  ref?: ForwardedRef<HTMLDivElement>;
  placeholder?: string;
}

export function useRichTextEditor({
  value,
  onChange,
  onBlur,
  placeholder,
}: UseRichTextEditorProps) {
  return useEditor({
    extensions: EDITOR_EXTENSIONS(placeholder),
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: onBlur,
    immediatelyRender: false,
  });
}
