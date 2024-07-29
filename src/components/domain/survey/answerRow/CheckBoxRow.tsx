import { cn } from '@/lib/utils';
import type { UseFormRegister } from 'react-hook-form';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface CheckBoxRowProps {
  index: number;
  revieweeName: string;
  iconIndex: number;
  questionIndex: number;
  register: UseFormRegister<Record<string, unknown>>;
}

export default function CheckBoxRow({
  index,
  revieweeName,
  register,
  iconIndex,
  questionIndex,
}: CheckBoxRowProps) {
  const backgroundColor = index % 2 === 1 ? 'bg-gray-100' : 'bg-gray-50';

  return (
    <div
      className={cn(
        'mb-2 flex w-full items-center justify-between rounded-[20px] px-4 py-2 md:px-8',
        backgroundColor,
      )}>
      <div className="flex max-w-[250px] items-center gap-2">
        <CirclePlanetIcon className="bg-gray-100" iconIndex={iconIndex} />
        <span className="mr-4 mobile1">{revieweeName}</span>
      </div>
      <input
        type="checkbox"
        {...register(`responses[${questionIndex}].responseDetails[${index}].response.choice`)}
        className="mr-4 h-5 w-5 appearance-none rounded border-2 border-gray-400 checked:border-purple-500 checked:bg-purple-500"
      />
    </div>
  );
}
