import type { UseFormRegister } from 'react-hook-form';
import MaxLengthMultiTextArea from '@/components/common/input/MaxLengthMultiTextInput';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface TextRowProps {
  index: number;
  name: string;
  member: string;
  iconIndex: number;
  questionIndex: number;
  register: UseFormRegister<Record<string, unknown>>;
}

export default function TextRow({
  index,
  member,
  register,
  iconIndex,
  questionIndex,
}: TextRowProps) {
  return (
    <div className="mb-2 flex w-full rounded-[20px] bg-gray-100 py-2 md:px-8">
      <div className="flex items-center gap-4">
        <CirclePlanetIcon className="bg-gray-200" iconIndex={iconIndex} />
        <span className="mr-4 mobile1">{member}</span>
      </div>
      <div className="flex w-[75%] flex-col space-y-3">
        <MaxLengthMultiTextArea
          maxLength={50}
          placeholder="강점을 알려 주세요."
          className="h-[40px] w-full max-w-[670px] border-2"
          {...register(
            `responses[${questionIndex}].responseDetails[${index}].response.description`,
          )}
        />
        <MaxLengthMultiTextArea
          maxLength={200}
          placeholder="자세한 예를 들어 설명해 강점을 알려 주세요."
          className="h-[60px] w-full max-w-[670px] border-2"
          {...register(`responses[${questionIndex}].responseDetails[${index}].response.example`)}
        />
      </div>
    </div>
  );
}
