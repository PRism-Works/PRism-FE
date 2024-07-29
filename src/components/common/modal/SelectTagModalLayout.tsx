'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useUniqueListState } from '@/hooks/useUniqueListState';
import { Button } from '@/components/ui/button';
import ModalLayout from './ModalLayout';
import { Separator } from '@/components/ui/separator';
import IconInput from '../input/IconInput';
import { Search } from 'lucide-react';
import TagInput from '../input/TagInput';
import { useModalStore } from '@/stores/modalStore';
import { cn } from '@/lib/utils';

interface SelectTagModalLayoutProps {
  title: string;
  colorTheme: 'purple' | 'indigo' | 'gray';
  placeholder: string;
  tagList: readonly string[];
  defaultSelectTagList: string[];
  onSelectComplete: (selectTags: string[]) => void;
}

// 단어 비교 시, 공백과 대소문자는 구별하지 않는다.
const normalizeString = (str: string) => str.replace(/\s+/g, '').toLowerCase();

export default function SelectTagModalLayout({
  title,
  colorTheme,
  placeholder,
  tagList,
  defaultSelectTagList,
  onSelectComplete,
}: SelectTagModalLayoutProps) {
  const [message, setMessage] = useState<string>('');
  const [messageClassName, setMessageClassname] = useState<string>('');

  const [searchWord, setSearchWord] = useState<string>('');

  const closeModal = useModalStore((state) => state.closeModal);
  const { selectList, addSelectList, isSelected } =
    useUniqueListState<string>(defaultSelectTagList);

  const selectTagScrollRef = useRef<HTMLDivElement>(null);

  const filteredTagList = tagList.filter((tag) =>
    normalizeString(tag).includes(normalizeString(searchWord)),
  );
  const availableTags = filteredTagList.filter((tag) => !isSelected(tag));

  const checkExistTags = useCallback(
    (checkWord: string) => {
      const normalizedSearchWord = normalizeString(checkWord);
      const existingTag = tagList.find((tag) => normalizeString(tag) === normalizedSearchWord);

      return existingTag || isSelected(checkWord) || tagList.includes(checkWord);
    },
    [isSelected, tagList],
  );

  const handleSelectComplete = () => {
    // 선택한 태그가 없는데 '적용하기' 버튼을 누를 경우 return 처리
    if (selectList.size === 0) {
      alert('선택한 태그가 없습니다.');
      return;
    }
    onSelectComplete(Array.from(selectList));
    closeModal();
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWord(event.target.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchWord.trim() !== '') {
      event.preventDefault();

      // 기본 제공 리스트가 비어있고, 추가된 태그에 존재하지 않으면 새로운 단어로 리스트 추가
      if (availableTags.length === 0 && !checkExistTags(searchWord)) {
        addSelectList(searchWord);
        setSearchWord('');
        setMessage('');
        setMessageClassname('');
      }
    }
  };

  useEffect(() => {
    if (availableTags.length === 0) {
      if (checkExistTags(searchWord)) {
        setMessage('이미 존재하는 태그입니다.');
        setMessageClassname('text-danger-500');
      } else {
        setMessage('엔터를 눌러 새 태그를 추가하세요!');
        setMessageClassname('text-info-500');
      }
    } else {
      setMessage('');
      setMessageClassname('');
    }
  }, [availableTags, checkExistTags, searchWord]);

  useEffect(() => {
    if (selectTagScrollRef.current) {
      selectTagScrollRef.current.scrollLeft = selectTagScrollRef.current.scrollWidth;
    }
  }, [selectList]);

  const renderTagInput = (tag: string, index: number, isSelected: boolean) => (
    <TagInput
      key={index}
      value={tag}
      colorTheme={colorTheme}
      buttonType={isSelected ? 'delete' : 'none'}
      onClick={() => addSelectList(tag)}
    />
  );

  return (
    <ModalLayout
      contentClassName="max-w-[384px] p-[20px]"
      title={<div className="body8">{title}</div>}
      footer={<Button onClick={handleSelectComplete}>등록하기</Button>}>
      <main className="my-[20px] h-[300px] w-full flex-col gap-3">
        <div className="h-[75%] w-full gap-2 overflow-hidden flex-col-center">
          <div className="w-full">
            <IconInput
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              value={searchWord}
              className="h-[45px] w-full flex-1 pl-12 mobile1"
              svgIcon={<Search className="mx-2 h-5 w-5 text-gray-500" />}
              placeholder={placeholder}
            />
          </div>
          <div className="h-[100%] w-full overflow-y-auto scroll-smooth scrollbar-thin">
            <div className="flex flex-wrap gap-1">
              {availableTags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {availableTags.map((tag, index) => renderTagInput(tag, index, false))}
                </div>
              ) : (
                <div
                  className={cn(
                    'flex h-full flex-col gap-2 text-gray-500 display5',
                    messageClassName,
                  )}>
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex h-[25%] flex-col">
          <div className="text-gray-700 display5">내가 선택한 태그</div>
          <div
            ref={selectTagScrollRef}
            className="flex h-[45px] w-full items-center gap-1 overflow-x-auto scroll-smooth scrollbar-thin">
            {Array.from(selectList).map((tag, index) => renderTagInput(tag, index, true))}
          </div>
        </div>
      </main>
    </ModalLayout>
  );
}
