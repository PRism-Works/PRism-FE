import { cn } from '@/lib/utils';
import { Check, Plus } from 'lucide-react';

interface CheckTagInputProps {
  value: string;
  isChecked: boolean;
  isDisabled: boolean;
  onClick: () => void; // 클릭 이벤트 실행 (부모 컴포넌트는 setState 함수를 실행시키는 함수를 보내야함)
  mode?: 'LIGHT' | 'DARK';
}

export default function CheckTagInput({
  value,
  isChecked = false,
  isDisabled = false,
  onClick,
  mode = 'LIGHT',
}: CheckTagInputProps) {
  const isDarkMode = mode === 'DARK';

  const getClassNameByStatus = (): string => {
    if (isChecked)
      return isDarkMode
        ? 'border border-solid border-white bg-purple-500 p-2 cursor-pointer text-white'
        : 'border border-solid border-purple-500 bg-purple-50 p-2 cursor-pointer text-purple-700';
    if (isDisabled)
      return isDarkMode
        ? 'border border-transparent cursor-not-allowed bg-gray-700 p-2 text-gray-500'
        : 'border border-transparent cursor-not-allowed bg-gray-100 p-2 text-gray-300';
    return isDarkMode
      ? 'border border-transparent bg-purple-900 p-2 cursor-pointer text-white'
      : 'border border-transparent bg-gray-100 p-2 cursor-pointer text-gray-600';
  };

  return (
    <div
      onClick={onClick}
      className={`h-[36px] w-fit gap-1 overflow-hidden whitespace-nowrap rounded-[6px] display5 flex-center ${getClassNameByStatus()}`}>
      <span>{value}</span>
      <span>
        {isChecked ? (
          <Check className={cn('h-4 w-4', isDarkMode ? 'stroke-white' : 'stroke-purple-500')} />
        ) : (
          <Plus
            className={cn(
              'h-4 w-4',
              isDarkMode
                ? isDisabled
                  ? 'stroke-gray-400'
                  : 'stroke-white'
                : isDisabled
                  ? 'stroke-gray-300'
                  : 'stroke-gray-500',
            )}
          />
        )}
      </span>
    </div>
  );
}
