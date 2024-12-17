import { useFormContext } from 'react-hook-form';
import { TeamRecruitFormValues } from '@/models/team/teamModels';
import { SectionLayout } from './ui/SectionLayout';
import DateRangePickerWithCheckbox from '@/components/common/calendar/DateRangePickerWithCheckbox';

export default function RecruitmentPeriodSection() {
  const { control } = useFormContext<TeamRecruitFormValues>();

  return (
    <SectionLayout label="팀원 모집 기간*" description="팀원 모집을 받을 기간을 입력해 주세요.">
      <DateRangePickerWithCheckbox
        control={control}
        startDateFieldName="startDate"
        endDateFieldName="endDate"
        isOpenEndedFieldName="isOpenEnded"
        startDatePlaceholder="모집 시작일을 선택해 주세요."
        endDatePlaceholder="모집 마감일을 선택해 주세요."
        checkboxLabel="마감일 팀원 모집 완료 시까지"
        openEndedText="모집 완료 시까지"
      />
    </SectionLayout>
  );
}
