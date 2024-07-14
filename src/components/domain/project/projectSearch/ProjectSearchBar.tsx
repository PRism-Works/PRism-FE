'use client';

import { useEffect, useReducer, useState } from 'react';
import IconInput from '@/components/common/input/IconInput';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, User, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import TagInput from '@/components/common/input/TagInput';
import { ProjectCategories } from '@/utils/tagList';
import CheckTagInput from '@/components/common/input/CheckTagInput';
import { useProjectCategory } from '@/hooks/useProjectCategory';

interface ProjectSearchBarProps {
  className?: string;
}

export default function ProjectSearchBar({ className }: ProjectSearchBarProps) {
  const [placeholder, setPlaceholder] = useState('이름 혹은 이메일을 검색해주세요');
  const [isDetailVisible, toggleDetailVisibility] = useReducer((state) => !state, false);

  const { categories, isCategorySelected, selectCategory, isSelectionLimitReached } =
    useProjectCategory(5);

  // 아래는 categories 변화 감지 예시 코드입니다.
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleValueChange = (value: string) => {
    if (value === 'member') {
      setPlaceholder('이름 혹은 이메일을 검색해 주세요.');
    } else if (value === 'project') {
      setPlaceholder('프로젝트명을 입력하세요.');
    }
  };

  return (
    <div className={cn('my-4', className)}>
      <Tabs defaultValue="member" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="member">
            <User className="mr-2 h-6 w-6" />
            <p className="body8">팀원</p>
          </TabsTrigger>
          <TabsTrigger value="project">
            <Clipboard className="mr-2 h-6 w-6" />
            <p className="body8">프로젝트명</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="member">{/* NOTE: 팀원 검색 내용 추가 예정 */}</TabsContent>
        <TabsContent value="project">{/* NOTE: 프로젝트명 검색 내용을 추가 예정 */}</TabsContent>
      </Tabs>

      <IconInput
        className="mt- h-[64px] w-full max-w-[700px] pl-14 body8 border-gradient"
        svgIcon={<Search className="mx-2 h-[24px] w-[24px] text-gray-500" />}
        placeholder={placeholder}
      />

      <div className="mt-3 flex items-center body8">
        <button onClick={toggleDetailVisibility} className="flex items-center text-gray-700">
          <span className="mx-1">검색 필터</span>
          {isDetailVisible ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      {isDetailVisible && (
        <div className="mt-2">
          {/* NOTE : 태그 회의 후 상세보기 내용 추가 예정 */}
          {/* #20240710.syjang, CheckTagInput 사용 예시 작성하려 임의로 코드 작성했습니다. 아래는 참고만 부탁드립니다. */}
          <div className="flex gap-4">
            <TagInput className="px-3 py-1 display6 tag-indigo" defaultValue="카테고리" />
            <div className="flex gap-1">
              {ProjectCategories.map((category) => {
                return (
                  <CheckTagInput
                    key={category}
                    value={category}
                    isChecked={isCategorySelected(category)}
                    isDisabled={isSelectionLimitReached() && !isCategorySelected(category)}
                    onClick={() => {
                      selectCategory(category);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
