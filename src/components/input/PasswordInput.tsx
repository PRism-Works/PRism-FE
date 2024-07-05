'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input, InputProps } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <div
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3"
          onClick={togglePasswordVisibility}>
          {showPassword ? (
            <Eye className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeOff className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
