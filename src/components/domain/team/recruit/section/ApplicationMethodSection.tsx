import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues, APPLICATION_METHOD_LABELS } from '@/models/team/teamModels';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import usePlaceholders from '../hooks/usePlaceholders';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { SectionLayout } from './ui/SectionLayout';

export default function ApplicationMethodSection() {
  const form = useFormContext<TeamRecruitFormValues>();
  const { getApplicationPlaceholder } = usePlaceholders(form);

  return (
    <SectionLayout label="신청 방법*" description="팀원 신청을 받을 방법을 선택해 주세요.">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="applicationMethod"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="relative">
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(APPLICATION_METHOD_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="absolute -bottom-6 ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applicationLink"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  placeholder={getApplicationPlaceholder()}
                  className={cn('w-full', error && 'border-red-500')}
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6 ml-1" />
            </FormItem>
          )}
        />
      </div>
    </SectionLayout>
  );
}
