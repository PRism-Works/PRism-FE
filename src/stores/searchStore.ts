import { CategoryCode } from '@/components/domain/project/projectSearch/ProjectSearchBar';
import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

const USER_STORE_NAME = 'search-condition-state';

interface SearchCondition {
  keyword: string;
  categories: CategoryCode[]; // 검색 시에는 카테고리 코드로 사용
}

interface useSearchStoreType {
  searchCondition: SearchCondition;
  setSearhcCondition: (searchCondition: SearchCondition) => void;
  clearSearhcCondition: () => void;
}

// 유저 데이터 정보 저장 스토어
export const useSearchStore = create<useSearchStoreType>()(
  devtools(
    persist(
      (set) => ({
        searchCondition: {
          keyword: '',
          categories: [],
        },
        setSearhcCondition: (searchCondition: SearchCondition) => set({ searchCondition }),
        clearSearhcCondition: () =>
          set({
            searchCondition: { keyword: '', categories: [] },
          }),
      }),
      {
        name: USER_STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
