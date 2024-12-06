import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues, POSITION_LABELS } from '@/models/team/teamModels';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SectionLayout } from './ui/SectionLayout';
import usePositionManagement from '../hooks/usePositionManagement';
import AddPositionButton from './ui/AddPositionButton';
import DeleteButton from './ui/DeleteButton';

export default function PositionSection() {
  const form = useFormContext<TeamRecruitFormValues>();
  const { addNewPosition, removePosition } = usePositionManagement(form);
  const positions = form.watch('positions');

  const handleCountChange = (value: string, onChange: (value: number | 'undecided') => void) => {
    if (value === 'undecided') {
      onChange('undecided');
    } else {
      onChange(parseInt(value));
    }
  };

  const getCountDisplayValue = (value: number | 'undecided' | undefined) => {
    if (typeof value === 'number') return `${value}명`;
    if (value === 'undecided') return '미정';
    return undefined;
  };

  const renderPositionField = (index: number) => (
    <FormField
      control={form.control}
      name={`positions.${index}.title`}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormControl className="w-full">
            <Select value={field.value || undefined} onValueChange={field.onChange}>
              <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
                <SelectValue placeholder="직무 선택" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-auto">
                {Object.entries(POSITION_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="ml-1" />
        </FormItem>
      )}
    />
  );

  const renderCountField = (index: number) => (
    <FormField
      control={form.control}
      name={`positions.${index}.count`}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="w-full">
          <FormControl>
            <Select
              value={field.value === undefined ? 'undecided' : field.value.toString()}
              onValueChange={(value) => handleCountChange(value, field.onChange)}>
              <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
                <SelectValue placeholder="0명">{getCountDisplayValue(field.value)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[180px] overflow-auto">
                <SelectItem value="undecided">미정</SelectItem>
                {[...Array(9)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}명
                  </SelectItem>
                ))}
                <SelectItem value="10">10명 이상</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="ml-1" />
        </FormItem>
      )}
    />
  );

  return (
    <SectionLayout label="모집 팀원*" description="새로 모집할 팀원에 대해 입력해 주세요.">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormLabel className="mobile text-gray-500">포지션</FormLabel>
          <FormLabel className="text-gray-500 mobile2">모집 인원</FormLabel>
        </div>

        {positions.map((_, index) => (
          <div key={index} className="grid w-full grid-cols-2 gap-3">
            {renderPositionField(index)}
            <div className="flex items-center gap-3">
              {renderCountField(index)}
              {index !== 0 && (
                <div className="shrink-0 flex-center">
                  <DeleteButton onClick={() => removePosition(index)} />
                </div>
              )}
            </div>
          </div>
        ))}
        <AddPositionButton onClick={addNewPosition} text="모집 직무 추가" />
      </div>
    </SectionLayout>
  );
}
