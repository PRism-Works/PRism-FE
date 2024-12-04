import { useCallback, useEffect } from 'react';
import { Control, FieldError, FieldValues, Path, useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import CustomCheckbox from '../checkbox/CustomCheckBox';
import useIsDarkMode from '@/hooks/useIsDarkMode';

interface DateRangePickerWithCheckboxProps<T extends FieldValues> {
  className?: string;
  control: Control<T>;
  startDateFieldName: Path<T>;
  endDateFieldName: Path<T>;
  isOpenEndedFieldName: Path<T>;
  startDatePlaceholder: string;
  endDatePlaceholder: string;
  checkboxLabel?: string;
  openEndedText?: string;
  startDateLabel?: string;
  endDateLabel?: string;
}

interface DateFieldType {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

type FieldErrorType = FieldError | undefined;

export default function DateRangePickerWithCheckbox<T extends FieldValues>({
  control,
  startDateFieldName,
  endDateFieldName,
  isOpenEndedFieldName,
  startDatePlaceholder,
  endDatePlaceholder,
  checkboxLabel,
  openEndedText,
  startDateLabel,
  endDateLabel,
}: DateRangePickerWithCheckboxProps<T>) {
  const { setValue, watch } = useFormContext<T>();
  const isDarkMode = useIsDarkMode();

  const startDate = watch(startDateFieldName);
  const isOpenEnded = watch(isOpenEndedFieldName);

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = useCallback(
    (field: { value: boolean; onChange: (value: boolean) => void }) => {
      field.onChange(!field.value);
    },
    [],
  );

  // 날짜 선택 핸들러
  const handleDateSelect = useCallback(
    (date: Date | undefined, field: { onChange: (date: Date | null) => void }) => {
      field.onChange(date ?? null);
    },
    [],
  );

  // 날짜 선택 버튼 스타일
  const getDatePickerButtonStyle = (value: Date | null, error: FieldErrorType) =>
    cn(
      'h-[45px] w-full justify-start border-gray-400 text-left font-normal',
      'truncate',
      !value ? 'text-gray-400' : 'text-black',
      isDarkMode && 'dark:text-gray-500 dark:border-gray-500 dark:bg-black/20',
      error && 'border-red-500',
    );

  // 시작일 필드
  const renderStartDateField = (field: DateFieldType, error: FieldErrorType) => (
    <FormItem className="relative w-full">
      {startDateLabel && <FormLabel className="mobile2">{startDateLabel}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className={getDatePickerButtonStyle(field.value, error)}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                format(field.value, 'yyyy.MM.dd')
              ) : (
                <span>{startDatePlaceholder}</span>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value || undefined}
            onSelect={(date) => handleDateSelect(date, field)}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            locale={ko}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute -bottom-6 ml-1" />
    </FormItem>
  );

  // 종료일 필드
  const renderEndDateField = (field: DateFieldType, error: FieldErrorType) => (
    <FormItem className="relative w-full">
      {endDateLabel && <FormLabel className="mobile2">{endDateLabel}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={isOpenEnded ? 'disabled' : 'outline'}
              className={getDatePickerButtonStyle(field.value, error)}
              onClick={(e) => {
                if (isOpenEnded) {
                  e.preventDefault();
                }
              }}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {isOpenEnded ? (
                openEndedText
              ) : field.value ? (
                format(field.value, 'yyyy.MM.dd')
              ) : (
                <span>{endDatePlaceholder}</span>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value || undefined}
            onSelect={(date) => {
              if (!isOpenEnded) {
                handleDateSelect(date, field);
              }
            }}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const start = startDate as Date | null;
              return (start ? date < start : false) || date < today;
            }}
            locale={ko}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute -bottom-6 ml-1" />
    </FormItem>
  );

  useEffect(() => {
    if (isOpenEnded) {
      setValue(endDateFieldName, null as unknown as T[typeof endDateFieldName]);
    }
  }, [isOpenEnded, setValue, endDateFieldName]);

  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name={isOpenEndedFieldName}
        render={({ field }) => (
          <CustomCheckbox
            className="text-gray-500 mobile2"
            checked={field.value}
            onCheckedChange={() => handleCheckboxChange(field)}
            label={checkboxLabel}
          />
        )}
      />
      <div className="flex flex-col gap-4 sm:flex-row">
        <FormField
          control={control}
          name={startDateFieldName}
          render={({ field, fieldState: { error } }) => renderStartDateField(field, error)}
        />
        <FormField
          control={control}
          name={endDateFieldName}
          render={({ field, fieldState: { error } }) => renderEndDateField(field, error)}
        />
      </div>
    </div>
  );
}
