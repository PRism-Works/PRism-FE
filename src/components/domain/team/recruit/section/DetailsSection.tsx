import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues } from '@/models/team/teamModels';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function DetailsSection() {
  const form = useFormContext<TeamRecruitFormValues>();

  return (
    <FormField
      control={form.control}
      name="details"
      render={({ field, fieldState: { error } }) => (
        <FormItem className="relative space-y-3">
          <FormControl>
            <Textarea
              placeholder="팀빌딩을 위한 상세 정보를 입력해 주세요."
              className={cn('min-h-[200px] w-full', error && 'border-red-500')}
              {...field}
            />
          </FormControl>
          <FormMessage className="absolute -bottom-6 ml-1" />
        </FormItem>
      )}
    />
  );
}
