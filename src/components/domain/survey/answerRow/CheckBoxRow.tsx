import type { UseFormRegister } from 'react-hook-form';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface CheckBoxRowProps {
  name: string;
  member: string;
  register: UseFormRegister<Record<string, unknown>>;
  iconIndex: number;
}

export default function CheckBoxRow({ name, member, register, iconIndex }: CheckBoxRowProps) {
  return (
    <div className="mb-2 flex w-full items-center justify-between rounded-[20px] bg-gray-100 px-4 py-2 md:px-8">
      <div className="flex items-center gap-4">
        <CirclePlanetIcon className="bg-gray-200" iconIndex={iconIndex} />
        <span className="mr-4 mobile1">{member}</span>
        <input
          type="checkbox"
          {...register(name)}
          className="h-5 w-5 appearance-none rounded border-2 border-gray-400 checked:border-purple-500 checked:bg-purple-500"
        />
      </div>
    </div>
  );
}
