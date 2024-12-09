import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues } from '@/models/team/teamModels';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import RichTextEditor from '@/components/common/textEditor/RichTextEditor';

export default function DetailsSection() {
  const form = useFormContext<TeamRecruitFormValues>();

  return (
    <FormField
      control={form.control}
      name="details"
      render={({ field, fieldState: { error } }) => (
        <FormItem className="relative space-y-3">
          <FormControl>
            <RichTextEditor
              value={field.value || ''}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={!!error}
              placeholder="팀빌딩을 위한 상세 정보를 입력해 주세요."
            />
          </FormControl>
          <FormMessage className="absolute -bottom-6 ml-1" />
        </FormItem>
      )}
    />
  );
}
