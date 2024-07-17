'use client';

import { useState } from 'react';

/**
 *
 * @param defaultSelectList 기본 선택 리스트
 * @param maxSelections 카테고리 최대 선택 개수
 * @returns
 */
export function useTagListState(
  defaultSelectList: string[] = [],
  maxSelections: number = Number.MAX_SAFE_INTEGER,
) {
  const [selectList, setSelectList] = useState<Set<string>>(new Set(defaultSelectList));
  const addSelectList = (category: string) => {
    setSelectList((prev) => {
      const newCategorySet = new Set(prev);
      if (newCategorySet.has(category)) {
        newCategorySet.delete(category);
      } else if (newCategorySet.size < maxSelections) {
        newCategorySet.add(category);
      }
      return newCategorySet;
    });
  };

  const isSelected = (category: string): boolean => selectList.has(category);
  const isSelectionLimitReached = (): boolean => selectList.size >= maxSelections;

  return {
    selectList,
    addSelectList,
    isSelected,
    isSelectionLimitReached,
  };
}
