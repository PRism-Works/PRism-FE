'use client';

import { Check, Plus } from 'lucide-react';

interface CheckTagInputProps {
  value: string;
  isChecked: boolean;
  isDisabled: boolean;
  onClick: () => void; // 클릭 이벤트 실행 (부모 컴포넌트는 setState 함수를 실행시키는 함수를 보내야함)
}

export default function CheckTagInput({
  value,
  isChecked = false,
  isDisabled = false,
  onClick,
}: CheckTagInputProps) {
  const getClassNameByStatus = (): string => {
    if (isChecked)
      return 'border border-solid border-purple-500 bg-purple-50 p-2 cursor-pointer text-gray-600';
    if (isDisabled)
      return 'border border-transparent cursor-not-allowed bg-gray-100 p-2 text-gray-300';
    return 'border border-transparent bg-gray-100 p-2 cursor-pointer text-gray-600';
  };

  return (
    <div
      onClick={onClick}
      className={`h-[36px] w-fit gap-1 overflow-hidden whitespace-nowrap rounded-[6px] display5 flex-center ${getClassNameByStatus()}`}>
      <span>{value}</span>
      <span>
        {isChecked ? (
          <Check className="h-4 w-4 stroke-purple-500" />
        ) : (
          <Plus className={`h-4 w-4 ${isDisabled ? 'stroke-gray-300' : 'stroke-gray-600'}`} />
        )}
      </span>
    </div>
  );
}
