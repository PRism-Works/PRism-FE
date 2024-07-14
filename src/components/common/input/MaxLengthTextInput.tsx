import { Input, InputProps } from '@/components/ui/input';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MaxLengthTextInputProps extends InputProps {
  errorMessage?: string;
  maxLength?: number;
}

const MaxLengthTextInput = forwardRef<HTMLInputElement, MaxLengthTextInputProps>(
  ({ className, errorMessage = '', maxLength = 100, ...props }, ref) => {
    const hasError = !!errorMessage;
    return (
      <div className="flex flex-col items-end gap-1">
        <Input
          className={cn(className, hasError ? 'border-red-500 focus:border-red-500' : '')}
          ref={ref}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex w-full items-center justify-between caption">
          <div className="text-danger-500">{errorMessage}</div>
          <div className="text-gray-500">{`${maxLength}자 이내`}</div>
        </div>
      </div>
    );
  },
);

MaxLengthTextInput.displayName = 'MaxLengthTextInput';

export default MaxLengthTextInput;
