export const FONT_STYLES = {
  'text-sm': { class: 'text-sm', label: 'smaller' },
  'text-base': { class: 'text-base', label: 'small' },
  'text-lg': { class: 'text-lg', label: 'medium' },
  'text-xl': { class: 'text-xl', label: 'large' },
  'text-2xl': { class: 'text-2xl', label: 'larger' },
} as const;

export const FONT_SIZE_OPTIONS = {
  Smaller: 'text-sm',
  Small: 'text-base',
  Medium: 'text-lg',
  Large: 'text-xl',
  'Extra Large': 'text-2xl',
} as const;

export const TEXT_COLORS = {
  black: { class: 'text-black', color: '#000000' },
  red: { class: 'text-red-500', color: '#EF4444' },
  orange: { class: 'text-orange-500', color: '#F97316' },
  green: { class: 'text-green-500', color: '#84CC16' },
  cyan: { class: 'text-cyan-500', color: '#06B6D4' },
  indigo: { class: 'text-indigo-500', color: '#6366F1' },
  purple: { class: 'text-purple-500', color: '#A855F7' },
  pink: { class: 'text-pink-500', color: '#EC4899' },
} as const;

export const HIGHLIGHT_COLORS = {
  yellow: { class: 'bg-yellow-200', color: '#FEF08A' },
  orange: { class: 'bg-orange-200', color: '#FED7AA' },
  blue: { class: 'bg-blue-200', color: '#BFDBFE' },
  purple: { class: 'bg-purple-200', color: '#E9D5FF' },
} as const;

export const EDITOR_CONTAINER_STYLES = {
  base: [
    'overflow-hidden',
    'rounded-[10px]',
    'border',
    'border-gray-400',
    'dark:border-gray-500',
    'dark:bg-black/20',
  ],
  error: 'border-red-500',
  focus: [
    'focus-within:border-purple-500',
    'dark:focus-within:border-purple-500',
    'focus-within:border-1',
  ],
} as const;

export const EDITOR_CONTENT_STYLES = {
  base: [
    '[&_.ProseMirror]:min-h-[200px]',
    '[&_.ProseMirror]:max-h-[500px]',
    '[&_.ProseMirror]:overflow-y-auto',
    '[&_.ProseMirror]:outline-none',
    '[&_.ProseMirror]:px-3 [&_.ProseMirror]:py-2',
    '[&_.ProseMirror-focused]:outline-none',
  ],
  placeholder: [
    '[&_.is-editor-empty:first-child::before]:text-gray-400',
    '[&_.is-editor-empty:first-child::before]:dark:text-gray-500',
    '[&_.is-editor-empty:first-child::before]:float-left',
    '[&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
    '[&_.is-editor-empty:first-child::before]:pointer-events-none',
    '[&_.is-editor-empty:first-child::before]:h-0',
  ],
  media: ['[&_img]:max-h-[300px] [&_img]:rounded-lg'],
} as const;

export const PREVIEW_STYLES = [
  'prose dark:prose-invert max-w-none',
  'prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4',
  'prose-h2:text-xl prose-h2:font-bold prose-h2:mb-3',
  'prose-h3:text-lg prose-h3:font-bold prose-h3:mb-2',
  'prose-mark:bg-yellow-200 prose-mark:rounded prose-mark:px-1',
  'prose-p:my-2',
  'prose-ul:list-disc prose-ul:pl-4 prose-ul:my-2',
  'prose-ol:list-decimal prose-ol:pl-4 prose-ol:my-2',
  'prose-li:my-1',
  'prose-a:text-purple-500 prose-a:underline',
  'prose-pre:bg-gray-100 prose-pre:rounded prose-pre:p-2 dark:prose-pre:bg-gray-800',
  'prose-code:text-purple-600 prose-code:text-sm dark:prose-code:text-purple-400',
  'prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic',
  'prose-img:max-h-[300px] prose-img:rounded-lg',
] as const;

export const TOOLBAR_BUTTON_STYLES = {
  base: 'h-8 w-8 p-0',
  active: 'bg-purple-500/20',
  icon: 'h-4 w-4',
} as const;

export const DIVIDER_STYLES = 'h-6 w-[1px] bg-gray-300 dark:bg-gray-600' as const;
