'use client';

import { Editor } from '@tiptap/react';
import {
  FontSizeDropdown,
  TextStyleButtons,
  CodeButtons,
  HighlightButton,
  TextColorButton,
  MediaButtons,
  LinkButton,
  ListButtons,
  AlignButtons,
} from './features';

interface ToolbarProps {
  editor: Editor;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <FontSizeDropdown editor={editor} />
      <TextStyleButtons editor={editor} />
      <CodeButtons editor={editor} />
      <HighlightButton editor={editor} />
      <TextColorButton editor={editor} />
      <MediaButtons editor={editor} />
      <LinkButton editor={editor} />
      <ListButtons editor={editor} />
      <AlignButtons editor={editor} />
    </div>
  );
}
