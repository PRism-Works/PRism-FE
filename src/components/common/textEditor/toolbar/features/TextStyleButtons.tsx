import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { TOOLBAR_BUTTON_STYLES, DIVIDER_STYLES } from '../editorStyles';

interface TextStyleButtonsProps {
  editor: Editor;
}

export function TextStyleButtons({ editor }: TextStyleButtonsProps) {
  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleToggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToggleBold}
        isActive={editor.isActive('bold')}
        icon={<Bold className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <ToolbarButton
        onClick={handleToggleItalic}
        isActive={editor.isActive('italic')}
        icon={<Italic className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <ToolbarButton
        onClick={handleToggleUnderline}
        isActive={editor.isActive('underline')}
        icon={<UnderlineIcon className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <div className={DIVIDER_STYLES} />
    </>
  );
}
