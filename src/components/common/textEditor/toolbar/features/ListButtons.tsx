import { Editor } from '@tiptap/react';
import { List, ListOrdered } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { TOOLBAR_BUTTON_STYLES, DIVIDER_STYLES } from '../editorStyles';

interface ListButtonsProps {
  editor: Editor;
}

export function ListButtons({ editor }: ListButtonsProps) {
  const handleToggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleToggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToggleBulletList}
        isActive={editor.isActive('bulletList')}
        icon={<List className={TOOLBAR_BUTTON_STYLES.icon} />}
        aria-label="불릿 리스트"
      />
      <ToolbarButton
        onClick={handleToggleOrderedList}
        isActive={editor.isActive('orderedList')}
        icon={<ListOrdered className={TOOLBAR_BUTTON_STYLES.icon} />}
        aria-label="번호 리스트"
      />
      <div className={DIVIDER_STYLES} />
    </>
  );
}
