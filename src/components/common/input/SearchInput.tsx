'use client';

import { forwardRef, useState, ChangeEvent } from 'react';

import { cn } from '@/lib/utils';
import { Input, InputProps } from '@/components/ui/input';
import { Search, XCircle } from 'lucide-react';

export interface SearchInputProps extends Omit<InputProps, 'onChange'> {
  onSearch: (keyword: string) => void;
  defaultKeyword?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, defaultKeyword = '', ...props }, ref) => {
    const [keyword, setKeyword] = useState<string>('');

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

    return (
      <div className="relative w-full">
        <Input
          className={cn('pr-24', className)}
          ref={ref}
          {...props}
          value={keyword || defaultKeyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {keyword && (
          <div className="absolute inset-y-0 right-12 w-12 cursor-pointer flex-center">
            <XCircle className="stroke-gray-500 stroke-[1.5px]" onClick={handleClear} />
          </div>
        )}
        <div
          className="absolute inset-y-0 right-0 w-12 cursor-pointer flex-center"
          onClick={handleSearch}>
          <Search className="stroke-gray-700 hover:stroke-[2.5px]" />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
