import { Control, FieldValues, Path } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDateToKoreanStyle } from '@/lib/dateTime';

import { FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import useIsDarkMode from '@/hooks/useIsDarkMode';
interface DatePickerWithRangeProps<T extends FieldValues> {
  className?: string;
  control: Control<T>;
  startDateFieldName: Path<T>;
  endDateFieldName: Path<T>;
}

export default function DatePickerWithRange<T extends FieldValues>({
  className = '',
  control,
  startDateFieldName,
  endDateFieldName,
}: DatePickerWithRangeProps<T>) {
  const isDarkMode = useIsDarkMode();

  return (
    <FormField
      control={control}
      name={startDateFieldName}
      render={({ field: startDateField }) => (
        <FormField
          control={control}
          name={endDateFieldName}
          render={({ field: endDateField }) => (
            <div className={cn('grid gap-2', className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'border-gray-400 focus:border-purple-500',
                      'h-[45px] w-full justify-start text-left font-normal',
                      !startDateField.value && !endDateField.value && 'text-muted-foreground',
                      isDarkMode &&
                        'dark:text-gray-500 dark:border-gray-500 dark:bg-black/20 dark:focus:border-purple-500',
                      className,
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDateField.value ? (
                      endDateField.value ? (
                        <>
                          {formatDateToKoreanStyle(startDateField.value)} -{' '}
                          {formatDateToKoreanStyle(endDateField.value)}
                        </>
                      ) : (
                        formatDateToKoreanStyle(startDateField.value)
                      )
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600">기간을 선택해주세요.</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    formatters={{
                      formatCaption: (date, options) =>
                        format(date, 'yyyy년 MM월', { locale: options?.locale }),
                    }}
                    locale={ko}
                    initialFocus
                    mode="range"
                    defaultMonth={startDateField.value || new Date()}
                    selected={{
                      from: startDateField.value || undefined,
                      to: endDateField.value || undefined,
                    }}
                    onSelect={(range) => {
                      startDateField.onChange(range?.from || null);
                      endDateField.onChange(range?.to || null);
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />
      )}
    />
  );
}
