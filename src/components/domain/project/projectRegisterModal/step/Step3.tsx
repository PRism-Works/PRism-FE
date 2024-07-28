'use client';
import { useEffect, useState } from 'react';
import { useUniqueListState } from '@/hooks/useUniqueListState';

import TagInput from '@/components/common/input/TagInput';
import IconInput from '@/components/common/input/IconInput';
import CheckTagInput from '@/components/common/input/CheckTagInput';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';
import MaxLengthMultiTextArea from '@/components/common/input/MaxLengthMultiTextInput';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CheckCircle2, Paperclip } from 'lucide-react';

import { ProjectCategories, TechStacks } from '@/lib/tagList';
import { ProjectForm } from '@/models/project/projectModels';
import { useFormContext } from 'react-hook-form';
import { useModalStore } from '@/stores/modalStore';
import SelectTagModalLayout from '@/components/common/modal/SelectTagModalLayout';
import { cn } from '@/lib/utils';

interface Step3Props {
  isEdit: boolean;
}
export default function Step3({ isEdit }: Step3Props) {
  const openModal = useModalStore((state) => state.openModal);
  const { control, setValue, getValues, watch } = useFormContext<ProjectForm>();

  // 프로젝트 스킬
  const currentSkills = watch('skills');

  // 프로젝트 url 공개 여부
  // 프로젝트 url 공개/비공개 여부는 수정모드에서만 선택 가능, 등록시에는 무조건 false
  const defaultUrlVisibility = getValues('urlVisibility');
  const [urlVisibility, setUrlVisibility] = useState<boolean>(defaultUrlVisibility);
  const handleSelectUrlVisibility = (visibility: boolean) => {
    setUrlVisibility(visibility);
    setValue('urlVisibility', visibility);
  };

  // 프로젝트 카테고리
  // default 값이 있다면 적용하기
  const defaultCategories = getValues('categories');
  const {
    selectList: categories,
    addSelectList,
    isSelected,
    isSelectionLimitReached,
  } = useUniqueListState<string>(defaultCategories, 3);

  const handleSkillsSelectComplete = (skillTags: string[]) => {
    setValue('skills', skillTags);
  };

  const handleOpenSkillsModal = () => {
    openModal(
      <SelectTagModalLayout
        title="기술 스택 검색"
        colorTheme="gray"
        placeholder="프로젝트에 사용된 기술스택을 선택해 주세요."
        tagList={TechStacks}
        onSelectComplete={handleSkillsSelectComplete}
        defaultSelectTagList={currentSkills}
      />,
    );
  };

  const handleSkillDelete = (fieldValue: string[], skillIndex: number) => {
    const newSkills = fieldValue.filter((_, i) => i !== skillIndex);
    setValue('skills', newSkills, { shouldValidate: true });
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
          <FormItem className="relative">
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
            {isEdit && (
              <ProjectUrlVisibility
                visibility={urlVisibility}
                handleSelectUrlVisibility={handleSelectUrlVisibility}
              />
            )}
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
                      onClick={() => handleSkillDelete(field.value, skillIndex)}
                    />
                  </li>
                ))}
                <TagInput
                  value="JavaScript"
                  onClick={handleOpenSkillsModal}
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
                placeholder="텍스트를 입력해 주세요."
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
          {Object.values(ProjectCategories).map((category) => (
            <CheckTagInput
              key={category.code}
              value={category.name}
              isChecked={isSelected(category.name)}
              isDisabled={isSelectionLimitReached() && !isSelected(category.name)}
              onClick={() => {
                addSelectList(category.name);
              }}
            />
          ))}
        </div>
      </FormItem>
    </section>
  );
}

const ProjectUrlVisibility = ({
  visibility,
  handleSelectUrlVisibility,
}: {
  visibility: boolean;
  handleSelectUrlVisibility: (visibility: boolean) => void;
}) => {
  const getButtonClasses = (isSelected: boolean) =>
    cn('gap-1 caption flex-center', isSelected ? 'text-success-500' : 'text-gray-500');

  const getIconClasses = (isSelected: boolean) =>
    cn('h-4 w-4', isSelected ? 'fill-success-50 stroke-success-500' : 'stroke-gray-400');

  return (
    <div className="absolute bottom-[-22px] right-0 flex cursor-pointer gap-3">
      {[true, false].map((isPublic) => (
        <span
          key={isPublic ? 'public' : 'private'}
          onClick={() => handleSelectUrlVisibility(isPublic)}
          className={getButtonClasses(visibility === isPublic)}>
          <CheckCircle2 className={getIconClasses(visibility === isPublic)} />
          {isPublic ? '공개' : '비공개'}
        </span>
      ))}
    </div>
  );
};
