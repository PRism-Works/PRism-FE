import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues } from '@/models/team/teamModels';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function TitleSection() {
  const form = useFormContext<TeamRecruitFormValues>();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field, fieldState: { error } }) => (
        <FormItem className="relative space-y-3">
          <FormLabel className="text-gray-500 mobile2">팀빌딩 제목</FormLabel>
          <FormControl>
            <Input
              placeholder="팀빌딩 제목을 입력해 주세요."
              className={cn('w-full', error && 'border-red-500')}
              {...field}
            />
          </FormControl>
          <FormMessage className="absolute -bottom-6 ml-1" />
        </FormItem>
      )}
    />
  );
}
