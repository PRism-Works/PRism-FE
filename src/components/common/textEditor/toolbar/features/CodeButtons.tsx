import { Editor } from '@tiptap/react';
import { Code, FileCode } from 'lucide-react';
import { TOOLBAR_BUTTON_STYLES, DIVIDER_STYLES } from '../editorStyles';
import { ToolbarButton } from '../ToolbarButton';

interface CodeButtonProps {
  editor: Editor;
}

interface SingleCodeButtonProps {
  editor: Editor;
  isInlineCode?: boolean;
  icon: React.ReactNode;
}

function SingleCodeButton({ editor, isInlineCode = true, icon }: SingleCodeButtonProps) {
  const handleCodeClick = () => {
    if (isInlineCode) {
      editor.chain().focus().toggleCode().run();
    } else {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };

  return (
    <ToolbarButton
      onClick={handleCodeClick}
      isActive={editor.isActive(isInlineCode ? 'code' : 'codeBlock')}
      icon={icon}
      aria-label={isInlineCode ? '코드 스타일 적용' : '코드 블록 삽입'}
    />
  );
}

export function CodeButtons({ editor }: CodeButtonProps) {
  return (
    <>
      <SingleCodeButton
        editor={editor}
        isInlineCode={true}
        icon={<Code className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <SingleCodeButton
        editor={editor}
        isInlineCode={false}
        icon={<FileCode className={TOOLBAR_BUTTON_STYLES.icon} />}
      />
      <div className={DIVIDER_STYLES} />
    </>
  );
}
