import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <Progress
      value={percent}
      className="h-2 rounded-[7px] bg-gray-300 [&>*]:bg-purple-700 [&>*]:rounded-[7px]"
    />
  );
}
