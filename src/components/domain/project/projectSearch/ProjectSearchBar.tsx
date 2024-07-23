'use client';

import { useReducer, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectCategories } from '@/lib/tagList';
import CheckTagInput from '@/components/common/input/CheckTagInput';
import { useTagListState } from '@/hooks/useTagListState';
import SearchInput from '@/components/common/input/SearchInput';
import { cn } from '@/lib/utils';

export default function ProjectSearchBar() {
  const [placeholder, setPlaceholder] = useState('이름 혹은 이메일을 검색해주세요');
  const [isDetailVisible, toggleDetailVisibility] = useReducer((state) => !state, false);

  const { selectList, addSelectList, isSelected, isSelectionLimitReached } = useTagListState([], 5);

  const handleValueChange = (value: string) => {
    if (value === 'member') {
      setPlaceholder('이름 혹은 이메일을 검색해 주세요.');
    } else if (value === 'project') {
      setPlaceholder('프로젝트명을 입력해 주세요.');
    }
  };

  const handleCategoryClick = (category: string) => {
    addSelectList(category);
  };

  const handleSearch = (keyword: string) => {
    if (keyword === '' && selectList.size === 0) {
      alert('검색어 입력 또는 카테고리를 선택해 주세요.');
      return;
    }
    alert(`keyword: ${keyword}, category: ${JSON.stringify(Array.from(selectList))} 로 검색하기`);
  };

  return (
    <div className="my-4 w-[60%] gap-2 flex-col-center">
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
      </Tabs>
      <SearchInput
        className="h-[64px] w-full body8 border-gradient"
        placeholder={placeholder}
        onSearch={handleSearch}
      />
      <div className="flex w-full items-center body8">
        <button onClick={toggleDetailVisibility} className="flex items-center text-gray-700">
          <span className="mx-1">검색 필터</span>
          {isDetailVisible ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={cn(
          'w-full overflow-hidden transition-all duration-300 ease-in-out',
          isDetailVisible ? 'opacity-100' : 'opacity-0',
        )}>
        <div className="mt-2 w-full">
          <div className="flex w-full flex-wrap gap-3">
            <span className="h-9 w-20 rounded-[6px] bg-indigo-50 px-3 py-2 text-center text-indigo-500 display6">
              카테고리
            </span>
            <div className="flex flex-wrap gap-1">
              {ProjectCategories.map((category) => (
                <CheckTagInput
                  key={category}
                  value={category}
                  isChecked={isSelected(category)}
                  isDisabled={isSelectionLimitReached() && !isSelected(category)}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
