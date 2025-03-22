import { formatDateToDotSeparatedYYYYMMDD } from '@/lib/dateTime';

interface ProjectPeriodProps {
  startDate: Date;
  endDate: Date;
}

const ProjectPeriod = ({ startDate, endDate }: ProjectPeriodProps) => {
  // 유효하지 않은 날짜 처리
  const formattedStartDate =
    startDate instanceof Date && !isNaN(startDate.getTime())
      ? formatDateToDotSeparatedYYYYMMDD(startDate)
      : '-';
  const formattedEndDate =
    endDate instanceof Date && !isNaN(endDate.getTime())
      ? formatDateToDotSeparatedYYYYMMDD(endDate)
      : '-';

  return (
    <div className="text-gray-500 flex-shrink-0 display5">
      <time>{formattedStartDate}</time> - <time>{formattedEndDate}</time>
    </div>
  );
};

export default ProjectPeriod;
