import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'focus:border-1 flex h-[45px] rounded-[10px] border border-gray-400 bg-background px-[13px] py-[10px] text-sm placeholder:text-gray-400 disabled:bg-gray-100 focus:border-purple-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black/30',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
