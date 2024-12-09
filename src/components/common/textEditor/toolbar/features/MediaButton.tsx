import { Editor } from '@tiptap/react';
import { Image as ImageIcon } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { TOOLBAR_BUTTON_STYLES } from '../editorStyles';

interface ImageUploadButtonProps {
  editor: Editor;
}

export function MediaButtons({ editor }: ImageUploadButtonProps) {
  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          editor?.chain().focus().setImage({ src: result }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <ToolbarButton
      onClick={addImage}
      icon={<ImageIcon className={TOOLBAR_BUTTON_STYLES.icon} />}
      aria-label="이미지 삽입"
    />
  );
}
