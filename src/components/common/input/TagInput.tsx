'use client';

import { KeyboardEvent, ChangeEvent, useEffect, useRef, useState } from 'react';

interface TagInputProps {
  defaultValue?: string;
  placeholder?: string;
  prefixChar?: string;
  maxLength?: number;
  className?: string;
  isDisabled?: boolean;
  setValue?: (value: string) => void;
}

export default function TagInput({
  defaultValue,
  placeholder = '',
  prefixChar = '',
  maxLength = 50,
  className = 'tag-purple',
  isDisabled = false,
  setValue,
}: TagInputProps) {
  // 초기 너비의 참조가 될 텍스트 지정 (우선순위 : defaultValue > placeholder)
  const initialWidthReference: string = defaultValue || placeholder;

  const [tagWidth, setTagWidth] = useState<number>(0);
  const fakeSpanRef = useRef<HTMLSpanElement>(null);
  const [spanText, setSpanText] = useState<string>(initialWidthReference);

  useEffect(() => {
    if (fakeSpanRef.current) {
      const width = fakeSpanRef.current.getBoundingClientRect().width;
      setTagWidth(width);
    }
  }, [spanText]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currText = event.target.value;

    // input의 값이 빈 경우 placeholder 텍스트 크기를 구해야한다.
    setSpanText(currText || placeholder);

    // 텍스트가 바뀌면 컴포넌트에서 넘겨받은 setValue 함수를 호출시킨다.
    if (setValue) {
      setValue(currText);
    }
  };

  // 엔터 키 이벤트 시, input 포커스 해제
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div
      className={`flex w-fit items-center justify-between ${className} overflow-hidden rounded-[6px]`}>
      {prefixChar && <span className="ml-[6px] flex-center">{prefixChar}</span>}
      <input
        spellCheck={false}
        defaultValue={defaultValue || ''}
        maxLength={maxLength}
        disabled={isDisabled}
        style={{ width: `${tagWidth}px` }}
        className={`px-[6px] py-[4px] display5 focus-visible:outline-none ${className}`}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <span
        ref={fakeSpanRef}
        className={`invisible absolute left-0 top-0 -z-10 whitespace-pre px-[6px] py-[4px] ${className}`}>
        {spanText}
      </span>
    </div>
  );
}
