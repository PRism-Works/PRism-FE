'use client';

import { useReducer, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectCategories } from '@/lib/tagList';
import CheckTagInput from '@/components/common/input/CheckTagInput';
import { useTagListState } from '@/hooks/useTagListState';
import SearchInput from '@/components/common/input/SearchInput';
import { SearchTypeConst, useSearchStore, type SearchType } from '@/stores/searchStore';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface ProjectSeqrchBarProps {
  defualtKeyword?: string;
  defaultCategories?: number[];
  defaultDetailVisible?: boolean;
}
export default function ProjectSearchBar({
  defualtKeyword = '',
  defaultCategories = [],
  defaultDetailVisible = false,
}: ProjectSeqrchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const setSearhcCondition = useSearchStore((state) => state.setSearhcCondition);
  const [selectTabType, setSelectTabType] = useState<SearchType>(SearchTypeConst.MEMBER_NAME);
  const [isDetailVisible, toggleDetailVisibility] = useReducer(
    (state) => !state,
    defaultDetailVisible,
  );

  const { selectList, addSelectList, isSelected, isSelectionLimitReached } =
    useTagListState<number>(defaultCategories, 5);

  const handleValueChange = (value: string) => {
    if (value === SearchTypeConst.MEMBER_NAME) {
      setSelectTabType(SearchTypeConst.MEMBER_NAME);
    } else if (value === SearchTypeConst.PROJECT_NAME) {
      setSelectTabType(SearchTypeConst.PROJECT_NAME);
    }
  };

  const handleCategoryClick = (categoryCode: number) => {
    addSelectList(categoryCode);
  };

  const handleSearch = (keyword: string) => {
    if (keyword === '' && selectList.size === 0) {
      alert('검색어 입력 또는 카테고리를 선택해 주세요.');
      return;
    }
    // 검색 시 현재 검색어 searchStore에 저장
    setSearhcCondition({
      type: selectTabType,
      keyword,
      categories: Array.from(selectList),
    });

    // 홈에서 한 검색이 아니라면 search 페이지로 이동
    if (pathname === '/') {
      router.push('/search');
    }
  };

  return (
    <div className="my-4 w-[60%] gap-2 flex-col-center">
      <Tabs defaultValue={selectTabType} onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value={SearchTypeConst.MEMBER_NAME}>
            <User className="mr-2 h-6 w-6" />
            <p className="body8">팀원</p>
          </TabsTrigger>
          <TabsTrigger value={SearchTypeConst.PROJECT_NAME}>
            <Clipboard className="mr-2 h-6 w-6" />
            <p className="body8">프로젝트명</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <SearchInput
        className="h-[64px] w-full body8 border-gradient focus:border-gradient"
        placeholder={
          selectTabType === SearchTypeConst.MEMBER_NAME
            ? '이름 혹은 이메일을 검색해주세요.'
            : '프로젝트명을 입력해 주세요.'
        }
        onSearch={handleSearch}
        defaultKeyword={defualtKeyword}
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
        <div className="mt-1 w-full">
          <div className="flex w-full flex-wrap gap-4">
            <span className="h-9 w-20 rounded-[6px] bg-indigo-50 px-3 py-2 text-center text-indigo-500 display6">
              카테고리
            </span>
            <ul className="flex flex-wrap gap-2">
              {ProjectCategories.map((category, index) => (
                <li key={category}>
                  <CheckTagInput
                    value={category}
                    isChecked={isSelected(index + 1)}
                    isDisabled={isSelectionLimitReached() && !isSelected(index + 1)}
                    onClick={() => handleCategoryClick(index + 1)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
