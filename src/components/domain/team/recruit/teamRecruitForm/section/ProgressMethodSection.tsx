import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues, PROGRESS_METHOD_LABELS } from '@/models/team/teamModels';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SectionLayout } from './ui/SectionLayout';

export default function ProgressMethodSection() {
  const form = useFormContext<TeamRecruitFormValues>();

  return (
    <SectionLayout label="진행 방법*" description="프로젝트를 진행할 방법을 선택해 주세요.">
      <FormField
        control={form.control}
        name="progressMethod"
        render={({ field, fieldState: { error } }) => (
          <FormItem className="relative">
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROGRESS_METHOD_LABELS).map(([value, label]) => (
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
    </SectionLayout>
  );
}
