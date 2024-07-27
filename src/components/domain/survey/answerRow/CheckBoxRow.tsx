import type { UseFormRegister } from 'react-hook-form';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface CheckBoxRowProps {
  index: number;
  name: string;
  member: string;
  iconIndex: number;
  questionIndex: number;
  register: UseFormRegister<Record<string, unknown>>;
}

export default function CheckBoxRow({
  index,
  member,
  register,
  iconIndex,
  questionIndex,
}: CheckBoxRowProps) {
  return (
    <div className="mb-2 flex w-full items-center justify-between rounded-[20px] bg-gray-100 px-4 py-2 md:px-8">
      <div className="flex items-center gap-4">
        <CirclePlanetIcon className="bg-gray-200" iconIndex={iconIndex} />
        <span className="mr-4 mobile1">{member}</span>
        <input
          type="checkbox"
          {...register(`responses[${questionIndex}].responseDetails[${index}].response.choice`)}
          className="h-5 w-5 appearance-none rounded border-2 border-gray-400 checked:border-purple-500 checked:bg-purple-500"
        />
      </div>
    </div>
  );
}
