import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MaxLengthTextInput from '@/components/common/input/MaxLengthTextInput';

import type { ProjectForm } from '@/models/projectModels';

export default function Step1() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectForm>();

  const getErrorClass = (fieldName: keyof typeof errors): string => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <section className="flex flex-col gap-4">
      <FormField
        control={control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-purple-500 mobile1">프로젝트 명*</FormLabel>
            <FormDescription className="text-gray-500">
              서비스 이름 혹은 팀명을 입력해 주세요.
            </FormDescription>
            <FormControl>
              <MaxLengthTextInput
                errorMessage={errors.projectName?.message}
                maxLength={50}
                className={`w-full`}
                placeholder="이름"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="organizationName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mobile1">기관명</FormLabel>
            <FormDescription className="text-gray-500">
              주최 측 혹은 팀이 속한 커뮤니티를 입력해 주세요.
            </FormDescription>
            <FormControl>
              <MaxLengthTextInput
                maxLength={50}
                className={`w-full`}
                placeholder="기관명"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* 임시 Input -> shadcn 샘플 date picker로 수정 예정, 임시로 start_date로 위치만 잡음 */}
      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-purple-500 mobile1">프로젝트 기간*</FormLabel>
            <FormDescription className="text-gray-500">
              프로젝트 기간을 입력해 주세요.
            </FormDescription>
            <FormControl>
              <Input type="date" className={`w-full ${getErrorClass('startDate')}`} {...field} />
            </FormControl>
            <FormMessage className="text-danger-500" />
          </FormItem>
        )}
      />
    </section>
  );
}
