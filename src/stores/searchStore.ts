import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

const USER_STORE_NAME = 'search-condition-state';

export const SearchTypeConst = {
  MEMBER_NAME: 'MEMBER_NAME',
  PROJECT_NAME: 'PROJECT_NAME',
} as const;

export type SearchType = (typeof SearchTypeConst)[keyof typeof SearchTypeConst];

export interface SearchCondition {
  type: SearchType;
  keyword: string;
  categories: number[]; // 검색 시에는 카테고리 코드로 사용
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
          type: 'MEMBER_NAME',
          keyword: '',
          categories: [],
        },
        setSearhcCondition: (searchCondition: SearchCondition) => set({ searchCondition }),
        clearSearhcCondition: () =>
          set({
            searchCondition: { type: 'MEMBER_NAME', keyword: '', categories: [] },
          }),
      }),
      {
        name: USER_STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
