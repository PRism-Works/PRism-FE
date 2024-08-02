'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type TagInputColor = 'purple' | 'indigo' | 'gray';
type TagInputButton = 'delete' | 'add' | 'none';

const colorConfig: Record<
  TagInputColor,
  {
    background: string;
    text: string;
    description: string;
    hoverAndActive: string;
    iconHover: string;
  }
> = {
  purple: {
    background: 'bg-purple-100',
    text: 'text-purple-500',
    description: 'text-purple-300',
    hoverAndActive: 'hover:bg-purple-200 active:bg-purple-300',
    iconHover: 'group-hover:text-purple-600',
  },
  indigo: {
    background: 'bg-indigo-100',
    text: 'text-indigo-500',
    description: 'text-indigo-300',
    hoverAndActive: 'hover:bg-indigo-200 active:bg-indigo-300',
    iconHover: 'group-hover:text-indigo-600',
  },
  gray: {
    background: 'bg-gray-100',
    text: 'text-gray-600',
    description: 'text-gray-400',
    hoverAndActive: 'hover:bg-gray-200 active:bg-gray-300',
    iconHover: 'group-hover:text-gray-600',
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
  const { background, text, description, hoverAndActive, iconHover } = colorConfig[colorTheme];

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
