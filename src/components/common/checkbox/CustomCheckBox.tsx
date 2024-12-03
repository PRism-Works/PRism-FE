'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { CheckCircle2 } from 'lucide-react';

interface CustomCheckboxProps {
  checked: boolean;
  onCheckedChange: () => void;
  label?: string;
  className?: string;
  size?: string;
}

export default function CustomCheckbox({
  checked,
  onCheckedChange,
  label,
  className,
  size = 'w-6 h-6',
}: CustomCheckboxProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div onClick={onCheckedChange}>
        <CheckCircle2
          className={cn(`cursor-pointer stroke-[1.5px] ${size}`, {
            'text-purple-500 fill-purple-50': checked && !isDarkMode,
            'text-gray-400 fill-transparent': !checked && !isDarkMode,
            'fill-purple-800 text-purple-200': checked && isDarkMode,
            'text-gray-800 fill-transparent': !checked && isDarkMode,
          })}
        />
      </div>
      {label && (
        <span className="cursor-pointer text-sm text-muted-foreground" onClick={onCheckedChange}>
          {label}
        </span>
      )}
    </div>
  );
}
