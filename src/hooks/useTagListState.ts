'use client';

import { useState } from 'react';

/**
 *
 * @param defaultSelectList 기본 선택 리스트
 * @param maxSelections 카테고리 최대 선택 개수
 * @returns
 */
export function useTagListState<T>(
  defaultSelectList: T[] = [],
  maxSelections: number = Number.MAX_SAFE_INTEGER,
) {
  const [selectList, setSelectList] = useState<Set<T>>(new Set(defaultSelectList));
  const addSelectList = (tag: T) => {
    setSelectList((prev) => {
      const newCategorySet = new Set(prev);
      if (newCategorySet.has(tag)) {
        newCategorySet.delete(tag);
      } else if (newCategorySet.size < maxSelections) {
        newCategorySet.add(tag);
      }
      return newCategorySet;
    });
  };

  const isSelected = (category: T): boolean => selectList.has(category);
  const isSelectionLimitReached = (): boolean => selectList.size >= maxSelections;

  return {
    selectList,
    addSelectList,
    isSelected,
    isSelectionLimitReached,
  };
}
