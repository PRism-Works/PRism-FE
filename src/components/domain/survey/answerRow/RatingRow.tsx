import { cn } from '@/lib/utils';
import type { UseFormRegister } from 'react-hook-form';
import { RadioGroup } from '@/components/ui/radio-group';
import CustomRadioButton from '@/components/common/input/CustomRadioButton';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface RatingRowProps {
  name: string;
  member: string;
  register: UseFormRegister<Record<string, unknown>>;
  iconIndex: number;
  index: number;
}

export default function RatingRow({ name, member, register, iconIndex, index }: RatingRowProps) {
  const backgroundColor = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50';

  return (
    <div
      className={cn(
        'mb-2 flex w-full items-center justify-between rounded-[20px] px-4 py-2 md:px-8',
        backgroundColor,
      )}>
      <div className="flex items-center gap-4">
        <CirclePlanetIcon className="bg-gray-100" iconIndex={iconIndex} />
        <span className="mobile1">{member}</span>
      </div>
      <RadioGroup className="flex items-center space-x-4 md:space-x-8 lg:space-x-20">
        <CustomRadioButton name={name} value="1" register={register} />
        <CustomRadioButton name={name} value="2" register={register} />
        <CustomRadioButton name={name} value="3" register={register} />
        <CustomRadioButton name={name} value="4" register={register} />
        <CustomRadioButton name={name} value="5" register={register} />
      </RadioGroup>
    </div>
  );
}
