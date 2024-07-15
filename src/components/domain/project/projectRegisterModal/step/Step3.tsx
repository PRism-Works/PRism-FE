'use client';
import { useEffect } from 'react';
import { useTagListState } from '@/hooks/useTagListState';

import TagInput from '@/components/common/input/TagInput';
import IconInput from '@/components/common/input/IconInput';
import CheckTagInput from '@/components/common/input/CheckTagInput';
import InformationTooltip from '@/components/common/tooltip/InfoTooltip';
import MaxLengthMultiTextArea from '@/components/common/input/MaxLengthMultiTextInput';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Paperclip } from 'lucide-react';

import { ProjectCategories, TechStacks } from '@/utils/tagList';
import { ProjectForm } from '@/models/projectModels';
import { useFormContext } from 'react-hook-form';
import { useModalStore } from '@/stores/modalStore';
import SelectTagModalLayout from '@/components/common/modal/SelectTagModalLayout';

export default function Step3() {
  const { control, setValue } = useFormContext<ProjectForm>();
  const openModal = useModalStore((state) => state.openModal);

  // 프로젝트 카테고리
  const {
    selectList: categories,
    addSelectList,
    isSelected,
    isSelectionLimitReached,
  } = useTagListState(3);

  const handleTechsSelectComplete = (skillTags: string[]) => {
    setValue('skills', skillTags);
  };
  const handleOpenSelectTagModal = () => {
    openModal(
      <SelectTagModalLayout
        title="역할 검색"
        colorTheme="gray"
        placeholder="팀원이 맡은 역할을 검색해주세요."
        tagList={TechStacks}
        onSelectComplete={handleTechsSelectComplete}
      />,
    );
  };

  // useEffect로 categories 변화 감지하여 setValue
  useEffect(() => {
    const categoriesArray = Array.from(categories);
    setValue('categories', categoriesArray);
  }, [categories, setValue]);

  return (
    <section className="flex flex-col gap-9">
      <FormField
        control={control}
        name="projectUrlLink"
        render={({ field }) => (
          <FormItem>
            <div className="item-center flex gap-1">
              <FormLabel className="mobile1">프로젝트 인증</FormLabel>
              <InformationTooltip message="나중에 추가 혹은 수정이 가능해요!" />
            </div>
            <FormDescription className="text-gray-500 caption">
              프로젝트를 소개할 수 있는 관련 링크를 작성해 주세요.
            </FormDescription>
            <FormControl>
              <IconInput
                className="w-full"
                svgIcon={<Paperclip className="h-4 w-4 stroke-gray-400" />}
                placeholder="프로젝트 산출물 혹은 팀페이지 링크"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mobile1">기술스택</FormLabel>
            <FormDescription className="text-gray-500 caption">
              프로젝트에 사용된 기술스택을 입력해 주세요.
            </FormDescription>
            <FormControl>
              <ul className="flex flex-wrap gap-1">
                {field.value.map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    <TagInput
                      value={skill}
                      colorTheme="gray"
                      buttonType="delete"
                      onClick={() => {
                        const newSkiils = field.value.filter((_, i) => i !== skillIndex);
                        setValue('skills', newSkiils, { shouldValidate: true });
                      }}
                    />
                  </li>
                ))}
                <TagInput
                  value="역할"
                  onClick={handleOpenSelectTagModal}
                  colorTheme="gray"
                  buttonType="add"
                />
              </ul>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="projectDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mobile1">프로젝트 설명</FormLabel>
            <FormDescription className="text-gray-500 caption">
              공들여 완수한 프로젝트에 대해 간략하게 설명해 주세요.
            </FormDescription>
            <FormControl>
              <MaxLengthMultiTextArea
                maxLength={300}
                className="w-full"
                placeholder="텍스트 입력..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormItem>
        <FormLabel className="mobile1">카테고리</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트의 카테고리를 선택해 주세요. (최대 3개 선택)
        </FormDescription>
        <div className="flex flex-wrap gap-1">
          {ProjectCategories.map((category) => {
            return (
              <CheckTagInput
                key={category}
                value={category}
                isChecked={isSelected(category)}
                isDisabled={isSelectionLimitReached() && !isSelected(category)}
                onClick={() => {
                  addSelectList(category);
                }}
              />
            );
          })}
        </div>
      </FormItem>
    </section>
  );
}
