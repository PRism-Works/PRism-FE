import { formatDateToDotSeparatedYYYYMMDD } from '@/lib/dateTime';

interface ProjectPeriodProps {
  startDate: Date;
  endDate: Date;
}
const ProjectPeriod = ({ startDate, endDate }: ProjectPeriodProps) => {
  return (
    <div className="text-gray-500 flex-shrink-0 display5">
      <time>{formatDateToDotSeparatedYYYYMMDD(startDate)}</time> -{' '}
      <time>{formatDateToDotSeparatedYYYYMMDD(endDate)}</time>
    </div>
  );
};
export default ProjectPeriod;
