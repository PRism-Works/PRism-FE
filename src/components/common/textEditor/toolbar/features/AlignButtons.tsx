import { Editor } from '@tiptap/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { TOOLBAR_BUTTON_STYLES } from '../editorStyles';

interface AlignButtonProps {
  align: 'left' | 'center' | 'right' | 'justify';
  editor: Editor;
  icon: React.ReactNode;
}

interface AlignButtonsProps {
  editor: Editor;
}

function AlignButton({ align, editor, icon }: AlignButtonProps) {
  const handleAlignClick = () => {
    editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <ToolbarButton
      onClick={handleAlignClick}
      isActive={editor.isActive({ textAlign: align })}
      icon={icon}
      aria-label={`${align} 정렬`}
    />
  );
}

export function AlignButtons({ editor }: AlignButtonsProps) {
  return (
    <>
      <AlignButton
        align="left"
        editor={editor}
        icon={<AlignLeft className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <AlignButton
        align="center"
        editor={editor}
        icon={<AlignCenter className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <AlignButton
        align="right"
        editor={editor}
        icon={<AlignRight className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <AlignButton
        align="justify"
        editor={editor}
        icon={<AlignJustify className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
    </>
  );
}
