import HashTagInput from '@/components/common/input/HashTagInput';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { XCircle } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProjectForm } from '../models';

export default function Step2() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
    shouldUnregister: true,
  });

  const memberCount: number = fields.length;

  const getErrorClass = (index: number, fieldName: 'name' | 'email' | 'role'): string => {
    return errors.members?.[index]?.[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <>
      <FormItem className="mb-[25px]">
        <FormLabel className="text-purple-500 mobile1">팀원정보*</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트에 참여한 팀원의 정보를 알려주세요
        </FormDescription>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex w-full items-center gap-[6px]">
                <span className="h-[40px] w-[40px] rounded-full bg-gray-100 flex-center">i</span>
                <FormField
                  control={control}
                  name={`members.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-[75px]">
                      <FormControl>
                        <Input
                          className={`w-full ${getErrorClass(index, 'name')}`}
                          placeholder="이름"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`members.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          className={`w-full ${getErrorClass(index, 'email')}`}
                          placeholder="prism@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {memberCount > 1 && (
                  <span onClick={() => remove(index)}>
                    <XCircle className="h-6 w-6 cursor-pointer stroke-gray-400 stroke-[1px]" />
                  </span>
                )}
              </div>
              <div className="relative ml-[46px] mt-[4px]">
                <FormField
                  control={control}
                  name={`members.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <HashTagInput
                          placeholder="역할"
                          setValue={(value) => field.onChange(value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="ml-[46px] mt-[4px]">
                <FormMessage className="text-danger-500 caption">
                  {errors.members?.[index]?.name?.message}
                </FormMessage>
                <FormMessage className="text-danger-500 caption">
                  {errors.members?.[index]?.email?.message}
                </FormMessage>
                <FormMessage className="text-danger-500 caption">
                  {errors.members?.[index]?.role?.message}
                </FormMessage>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', email: '', role: '' })}
          className="mt-3 w-full rounded-[4px] border border-dashed border-gray-300 px-4 py-2 text-gray-400 mobile2">
          +팀원 추가
        </button>
      </FormItem>
    </>
  );
}
