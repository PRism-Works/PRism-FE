'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type TagInputColor = 'purple' | 'indigo' | 'gray';
type TagInputButton = 'delete' | 'add' | 'none';

const colorConfig: Record<
  TagInputColor,
  { base: string; description: string; hover: string; iconHover: string }
> = {
  purple: {
    base: 'bg-purple-100 text-purple-500',
    description: 'text-purple-300',
    hover: 'hover:bg-purple-200',
    iconHover: 'group-hover:text-purple-600',
  },
  indigo: {
    base: 'bg-indigo-100 text-indigo-500',
    description: 'text-indigo-300',
    hover: 'hover:bg-indigo-200',
    iconHover: 'group-hover:text-indigo-600',
  },
  gray: {
    base: 'bg-gray-100 text-gray-500',
    description: 'text-gray-400',
    hover: 'hover:bg-gray-200',
    iconHover: 'group-hover:text-gray-600',
  },
};

interface TagInputProps {
  value: string;
  buttonType?: TagInputButton;
  colorTheme?: TagInputColor;
  className?: string;
  onClick?: () => void;
}

export default function TagInput({
  value,
  buttonType = 'none',
  colorTheme = 'purple',
  className = '',
  onClick = () => {},
}: TagInputProps) {
  const { base, description, hover, iconHover } = colorConfig[colorTheme];

  const handleTagClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className={cn(
        'group flex h-fit w-fit cursor-pointer items-center justify-between gap-1 rounded-[6px] px-1.5 py-1 transition-colors display5',
        base,
        hover,
        className,
      )}
      onClick={handleTagClick}>
      <span>#</span>
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
