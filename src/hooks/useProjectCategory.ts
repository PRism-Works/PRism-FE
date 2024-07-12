import { useState } from 'react';

/**
 *
 * @param maxSelections 카테고리 최대 선택 개수
 * @returns
 */
export function useProjectCategory(maxSelections: number = 3) {
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const selectCategory = (category: string) => {
    setCategories((prev) => {
      const newCategorySet = new Set(prev);
      if (newCategorySet.has(category)) {
        newCategorySet.delete(category);
      } else if (newCategorySet.size < maxSelections) {
        newCategorySet.add(category);
      }
      return newCategorySet;
    });
  };

  const isCategorySelected = (category: string): boolean => categories.has(category);
  const isSelectionLimitReached = (): boolean => categories.size >= maxSelections;

  return {
    categories,
    selectCategory,
    isCategorySelected,
    isSelectionLimitReached,
  };
}
