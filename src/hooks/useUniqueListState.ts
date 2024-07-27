'use client';

import { useState } from 'react';

/**
 * 유니크한 아이템 선택을 관리하는 커스텀 훅
 *
 * 중복 없는 아이템 리스트를 관리하는 기능을 제공:
 * - 선택된 아이템의 유일성을 보장
 * - 최대 선택 가능한 아이템 수를 제한
 * - 아이템의 추가/제거 및 선택 상태 확인 기능을 제공
 *
 * @param defaultSelectedList 초기에 선택된 아이템 리스트
 * @param maxSelections 선택 가능한 최대 아이템 수 (기본값: 무제한)
 * @returns 유니크 리스트 관리를 위한 함수들과 상태
 */
export function useUniqueListState<T>(
  defaultSelectedList: T[] = [],
  maxSelections: number = Number.MAX_SAFE_INTEGER,
) {
  const [selectList, setSelectList] = useState<Set<T>>(new Set(defaultSelectedList));
  const addSelectList = (tag: T) => {
    setSelectList((prev) => {
      const newListSet = new Set(prev);
      if (newListSet.has(tag)) {
        newListSet.delete(tag);
      } else if (newListSet.size < maxSelections) {
        newListSet.add(tag);
      }
      return newListSet;
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
