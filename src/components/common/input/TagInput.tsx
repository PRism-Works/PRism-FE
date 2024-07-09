'use client';

import { KeyboardEvent, ChangeEvent, useEffect, useRef, useState } from 'react';

interface TagInputProps {
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  isDisabled?: boolean;
  setValue?: (value: string) => void;
}

// Todo:
// 1. prefix 넘겨받기
// 2. setValue에는 changed 이벤트에 달아서 값 보내기
// 3. 클릭으로 값 선택할 수 잇으니, onClick 이벤트도 달기

export default function TagInput({
  defaultValue,
  placeholder = '',
  maxLength = 50,
  className = '',
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
    if (currText === '') {
      // input의 값이 빈 경우 placeholder 텍스트 크기를 구해야한다.
      setSpanText(placeholder);
    } else {
      setSpanText(currText);
    }

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
    <div style={{ padding: 0 }} className={`w-fit ${className} overflow-hidden rounded-[6px]`}>
      <input
        spellCheck={false}
        defaultValue={defaultValue || ''}
        maxLength={maxLength}
        disabled={isDisabled}
        style={{ width: `${tagWidth}px` }}
        className={`display5 focus-visible:outline-none ${className}`}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <span
        ref={fakeSpanRef}
        className={`absolute left-0 top-0 -z-10 px-[6px] py-[4px] opacity-0 mobile2`}>
        {spanText}
      </span>
    </div>
  );
}
