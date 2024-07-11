'use client';

import { Check, Plus } from 'lucide-react';

interface CheckTagInputProps {
  value: string;
  isChecked: boolean;
  onClick: () => void; // 클릭 이벤트 실행 (부모 컴포넌트는 setState 함수를 실행시키는 함수를 보내야함)
}

export default function CheckTagInput({ value, isChecked = false, onClick }: CheckTagInputProps) {
  return (
    <div
      onClick={onClick}
      className={`h-[36px] w-fit cursor-pointer gap-1 overflow-hidden whitespace-nowrap rounded-[6px] text-gray-600 display5 flex-center ${isChecked ? 'border border-solid border-purple-500 bg-purple-50 p-2' : 'bg-gray-100 p-2'}`}>
      <span>{value}</span>
      <span>
        {isChecked ? (
          <Check className="h-4 w-4 stroke-purple-500" />
        ) : (
          <Plus className="h-4 w-4 stroke-gray-600" />
        )}
      </span>
    </div>
  );
}
