import TagInput from '@/components/common/input/TagInput';
import { IconInput } from '@/components/common/input/IconInput';
import CheckTagInput from '@/components/common/input/CheckTagInput';

import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { Paperclip, Search, CircleCheck } from 'lucide-react';

import { ProjectCategories } from '@/utils/tagList';
import { useProjectCategory } from '@/hooks/useProjectCategory';
import { useEffect } from 'react';

export default function Step3() {
  const { categories, isCategorySelected, selectCategory } = useProjectCategory();

  // useEffect로 categories 변화 감지, 나중에 여기서 hook form에 setValue 하기
  // 아래는 수정 예정입니다.
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <>
      <FormItem className="mb-[25px]">
        <FormLabel className="mobile1">프로젝트 인증</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트를 소개할 수 있는 관련 링크를 작성해 주세요
        </FormDescription>
        <FormControl>
          <div className="relative w-full">
            <IconInput
              className="w-full"
              svgIcon={<Paperclip className="h-4 w-4 stroke-gray-400" />}
              placeholder="프로젝트 산출물 혹은 팀페이지 링크"
            />
          </div>
        </FormControl>
        <div className="flex justify-between">
          <FormDescription className="text-info-500 caption">
            나중에 추가 혹은 수정이 가능해요!
          </FormDescription>
          <div className="flex gap-[5px]">
            <span className="flex gap-[2px]">
              <CircleCheck className="h-5 w-5 cursor-pointer fill-success-50 stroke-success-500 stroke-[1.5px]" />
              <label className="cursor-pointer text-success-500 mobile2">공개</label>
            </span>
            <span className="flex cursor-pointer gap-[2px]">
              <CircleCheck className="h-5 w-5 cursor-pointer stroke-gray-400 stroke-[1.5px]" />
              <label className="cursor-pointer text-gray-400 mobile2">비공개</label>
            </span>
          </div>
        </div>
      </FormItem>
      <FormItem className="mb-[25px]">
        <FormLabel className="mobile1">기술스택</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트에 사용된 기술스택을 입력해 주세요
        </FormDescription>
        <div className="flex flex-wrap gap-1">
          <TagInput
            prefixChar="#"
            defaultValue="Spring Framework"
            setValue={(value) => console.log(value)}
          />
          <TagInput prefixChar="#" defaultValue="React" setValue={(value) => console.log(value)} />
        </div>
        <FormControl>
          <IconInput
            className="w-full"
            svgIcon={<Search className="h-4 w-4 stroke-gray-400" />}
            placeholder="JavaScript"
          />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel className="mobile1">프로젝트 설명</FormLabel>
        <FormDescription className="text-gray-500 caption">
          공들여 완수한 프로젝트에 대해 간략하게 설명해 주세요
        </FormDescription>
        <FormControl>
          <Input className="w-full" placeholder="텍스트 입력..." />
        </FormControl>
        <div className="flex flex-wrap gap-1">
          {ProjectCategories.map((category) => {
            return (
              <CheckTagInput
                key={category}
                value={category}
                isChecked={isCategorySelected(category)}
                onClick={() => {
                  selectCategory(category);
                }}
              />
            );
          })}
        </div>
      </FormItem>
    </>
  );
}
