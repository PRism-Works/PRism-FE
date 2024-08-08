'use client';

import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface MaxLengthMultiTextAreaProps extends TextareaProps {
  maxLength?: number;
}

const MaxLengthMultiTextArea = forwardRef<HTMLTextAreaElement, MaxLengthMultiTextAreaProps>(
  ({ className, maxLength = 300, ...props }, ref) => {
    return (
      <div className="relative flex flex-col items-end gap-1">
        <Textarea
          className={cn('resize-none pb-5', className)}
          ref={ref}
          maxLength={maxLength}
          onInput={(event) => {
            // 글자에 맞게 높이 조절
            const target = event.target as HTMLTextAreaElement;
            target.style.height = 'auto'; // Reset the height
            target.style.height = `${target.scrollHeight}px`;
          }}
          {...props}
        />
        <div className="text-gray-500 absolute bottom-1 right-2 caption">{`${maxLength}자 이내`}</div>
      </div>
    );
  },
);

MaxLengthMultiTextArea.displayName = 'MaxLengthMultiTextArea';

export default MaxLengthMultiTextArea;
