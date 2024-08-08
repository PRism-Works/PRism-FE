'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import useIsDarkMode from '@/hooks/useIsDarkMode';

type TagInputColor = 'purple' | 'indigo' | 'gray';
type TagInputButton = 'delete' | 'add' | 'none';

const colorConfig: Record<
  TagInputColor,
  {
    light: {
      background: string;
      text: string;
      description: string;
      hoverAndActive: string;
      iconHover: string;
    };
    dark: {
      background: string;
      text: string;
      description: string;
      hoverAndActive: string;
      iconHover: string;
    };
  }
> = {
  purple: {
    light: {
      background: 'bg-purple-100',
      text: 'text-purple-500',
      description: 'text-purple-300',
      hoverAndActive: 'hover:bg-purple-200 active:bg-purple-300',
      iconHover: 'group-hover:text-purple-600',
    },
    dark: {
      background: 'bg-purple-900',
      text: 'text-purple-300',
      description: 'text-purple-400',
      hoverAndActive: 'hover:bg-purple-700 active:bg-purple-600',
      iconHover: 'group-hover:text-purple-400',
    },
  },
  indigo: {
    light: {
      background: 'bg-indigo-100',
      text: 'text-indigo-500',
      description: 'text-indigo-300',
      hoverAndActive: 'hover:bg-indigo-200 active:bg-indigo-300',
      iconHover: 'group-hover:text-indigo-600',
    },
    dark: {
      background: 'bg-indigo-800',
      text: 'text-indigo-300',
      description: 'text-indigo-400',
      hoverAndActive: 'hover:bg-indigo-700 active:bg-indigo-600',
      iconHover: 'group-hover:text-indigo-400',
    },
  },
  gray: {
    light: {
      background: 'bg-gray-100',
      text: 'text-gray-600',
      description: 'text-gray-400',
      hoverAndActive: 'hover:bg-gray-200 active:bg-gray-300',
      iconHover: 'group-hover:text-gray-600',
    },
    dark: {
      background: 'bg-gray-700',
      text: 'text-gray-300',
      description: 'text-gray-400',
      hoverAndActive: 'hover:bg-gray-600 active:bg-gray-500',
      iconHover: 'group-hover:text-gray-400',
    },
  },
};

interface TagInputProps {
  value: string;
  buttonType?: TagInputButton;
  colorTheme?: TagInputColor;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  forSaveImage?: boolean;
}

export default function TagInput({
  value,
  buttonType = 'none',
  colorTheme = 'purple',
  className = '',
  onClick = () => {},
  isDisabled = false,
  forSaveImage = false,
}: TagInputProps) {
  const isDarkMode = useIsDarkMode();
  const { background, text, description, hoverAndActive, iconHover } =
    colorConfig[colorTheme][isDarkMode ? 'dark' : 'light'];

  const handleTagClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className={cn(
        'group flex h-fit w-fit cursor-pointer items-center justify-between gap-1 rounded-[6px] px-1.5 py-1 transition-colors display5',
        !forSaveImage && background,
        text,
        !isDisabled && hoverAndActive,
        isDisabled && 'cursor-default',
        className,
      )}
      onClick={handleTagClick}>
      <span className="mobile2">#</span>
      <span className={cn('whitespace-pre', buttonType === 'add' && description)}>{value}</span>
      <ButtonIcon buttonType={buttonType} iconHover={iconHover} />
    </div>
  );
}

const ButtonIcon = ({
  buttonType,
  iconHover,
}: {
  buttonType: TagInputButton;
  iconHover: string;
}) => {
  if (buttonType === 'none') return null;

  return (
    <X
      className={cn(
        'h-4 w-4 cursor-pointer transition-all',
        buttonType === 'add' && 'rotate-45',
        iconHover,
        'group-hover:stroke-[2.5px]',
      )}
    />
  );
};
