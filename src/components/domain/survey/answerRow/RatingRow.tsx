import type { UseFormRegister } from 'react-hook-form';
import { RadioGroup } from '@/components/ui/radio-group';
import CustomRadioButton from '@/components/common/input/CustomRadioButton';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface RatingRowProps {
  name: string;
  member: string;
  register: UseFormRegister<Record<string, unknown>>;
}

export default function RatingRow({ name, member, register }: RatingRowProps) {
  return (
    <div className="mb-2 flex w-full items-center justify-between rounded-[20px] bg-gray-100 px-4 py-2 md:px-8">
      <div className="flex items-center gap-4">
        <CirclePlanetIcon className="bg-gray-200" />
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
