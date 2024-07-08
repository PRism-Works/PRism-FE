import { KeyboardEvent, ChangeEvent, useEffect, useRef, useState } from 'react';

interface HashtagInputProps {
  placeholder: string;
  className?: string;
  setValue: (content: string) => void;
}

export default function HashtagInput({ placeholder, className = '', setValue }: HashtagInputProps) {
  const [tagWidth, setTagWidth] = useState<number>(0);
  const fakeSpanRef = useRef<HTMLSpanElement>(null);
  const [spanText, setSpanText] = useState<string>(placeholder);

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
    setValue(currText);
  };

  // 엔터 키 이벤트 시, input 포커스 해제
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div>
      <input
        maxLength={50}
        style={{ width: `${tagWidth}px` }}
        className={`rounded-[6px] display5 focus-visible:outline-none ${className}`}
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
