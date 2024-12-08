import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { Extension } from '@tiptap/core';
import { FONT_STYLES } from './editorStyles';

const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          size: {
            default: FONT_STYLES['text-base'].class,
            parseHTML: (element) => {
              const classes = element.className.split(' ');
              return classes.find((cls) => cls.startsWith('text-')) || 'text-base';
            },
            renderHTML: (attributes) => {
              if (!attributes.size) return {};
              return {
                class: attributes.size,
              };
            },
          },
        },
      },
    ];
  },
});

export const EDITOR_EXTENSIONS = (placeholder?: string) => [
  StarterKit.configure({
    bold: {
      HTMLAttributes: {
        class: 'font-bold',
      },
    },
    italic: {
      HTMLAttributes: {
        class: 'italic',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc pl-4 my-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal pl-4 my-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'my-1',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-gray-300 pl-4 italic my-2',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'bg-gray-100 rounded px-1 text-purple-600 text-sm',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'bg-gray-100 rounded-lg p-3 my-2',
      },
    },
  }),
  Color,
  FontSize,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
  }),
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: 'bg-yellow-200 rounded px-1',
    },
  }),
  FontFamily,
  Underline,
  HorizontalRule,
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'max-h-[300px] rounded-lg',
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-purple-500 underline',
    },
  }),
  Placeholder.configure({
    placeholder,
    emptyEditorClass: 'is-editor-empty',
  }),
];
