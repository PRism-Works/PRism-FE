'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { forwardRef, useState, ChangeEvent } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Search, XCircle } from 'lucide-react';

export interface SearchInputProps extends Omit<InputProps, 'onChange'> {
  onSearch: (keyword: string) => void;
  defaultKeyword?: string;
  mode?: 'LIGHT' | 'DARK';
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, defaultKeyword = '', mode, ...props }, ref) => {
    const { theme } = useTheme();
    const [keyword, setKeyword] = useState<string>(defaultKeyword);

    const handleSearch = () => {
      onSearch(keyword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    const handleClear = () => {
      setKeyword('');
    };

    const isDarkMode = mode ? mode === 'DARK' : theme === 'dark';

    return (
      <div className="relative w-full">
        <Input
          className={cn(
            'h-[64px] w-full pr-24 body8',
            isDarkMode
              ? 'bg-black bg-opacity-30 text-gray-50'
              : 'bg-white text-black border-gradient focus:border-gradient',
            className,
          )}
          ref={ref}
          {...props}
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {keyword && (
          <div className="absolute inset-y-0 right-12 w-12 cursor-pointer flex-center">
            <XCircle
              className={cn('stroke-[1.5px]', isDarkMode ? 'stroke-gray-300' : 'stroke-gray-500')}
              onClick={handleClear}
            />
          </div>
        )}
        <div
          className="absolute inset-y-0 right-0 w-12 cursor-pointer flex-center"
          onClick={handleSearch}>
          <Search
            className={cn(
              isDarkMode ? 'stroke-gray-200' : 'stroke-gray-700',
              'hover:stroke-[2.5px]',
            )}
          />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
