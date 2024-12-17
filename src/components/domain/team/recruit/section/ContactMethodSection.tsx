import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues, CONTACT_METHOD_LABELS } from '@/models/team/teamModels';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import usePlaceholders from './hooks/usePlaceholders';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { SectionLayout } from './ui/SectionLayout';

export default function ContactMethodSection() {
  const form = useFormContext<TeamRecruitFormValues>();
  const { getContactPlaceholder } = usePlaceholders(form);

  return (
    <SectionLayout label="연락 방법*" description="팀원과 연락할 방법을 선택해 주세요.">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="contactMethod"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="relative">
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(CONTACT_METHOD_LABELS).map(([value, label]) => (
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
          name="contactLink"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  placeholder={getContactPlaceholder()}
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
