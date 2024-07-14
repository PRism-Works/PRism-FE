'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Input, InputProps } from '@/components/ui/input';

export interface IconInputProps extends InputProps {
  svgIcon: JSX.Element;
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, svgIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input className={cn('pl-8', className)} ref={ref} {...props} />
        <div className="absolute inset-y-0 left-0 ml-3 flex-center">{svgIcon}</div>
      </div>
    );
  },
);

IconInput.displayName = 'IconInput';

export default IconInput;
