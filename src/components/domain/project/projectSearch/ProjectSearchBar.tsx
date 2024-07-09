'use client';

import { useState } from 'react';
import { IconInput } from '@/components/common/input/IconInput';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, User, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectSearchBarProps {
  className?: string;
}

export default function ProjectSearchBar({ className }: ProjectSearchBarProps) {
  const [placeholder, setPlaceholder] = useState('이름 혹은 이메일을 검색해주세요');
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleValueChange = (value: string) => {
    if (value === 'member') {
      setPlaceholder('이름 혹은 이메일을 검색해 주세요.');
    } else if (value === 'project') {
      setPlaceholder('프로젝트명을 입력하세요.');
    }
  };

  const toggleDetailVisibility = () => {
    setIsDetailVisible((prev) => !prev);
  };

  return (
    <div className={cn('my-4', className)}>
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
        <TabsContent value="member">{/* NOTE: 팀원 검색 내용 추가 예정 */}</TabsContent>
        <TabsContent value="project">{/* NOTE: 프로젝트명 검색 내용을 추가 예정 */}</TabsContent>
      </Tabs>

      <IconInput
        className="mt- h-[64px] w-full max-w-[700px] pl-14 body8 border-gradient"
        svgIcon={<Search className="mx-2 h-[24px] w-[24px] text-gray-500" />}
        placeholder={placeholder}
      />

      <div className="mt-3 flex items-center body8">
        <button onClick={toggleDetailVisibility} className="flex items-center text-gray-700">
          {isDetailVisible ? (
            <>
              <span className="mx-1">상세보기</span>
              <ChevronUp className="h-5 w-5" />
            </>
          ) : (
            <>
              <span className="mx-1">상세보기</span>
              <ChevronDown className="h-5 w-5" />
            </>
          )}
        </button>
      </div>

      {isDetailVisible && (
        <div className="mt-2">
          {/* NOTE : 태그 회의 후 상세보기 내용 추가 예정 */}
          <p className="text-gray-600">태그 추가 예정</p>
        </div>
      )}
    </div>
  );
}
