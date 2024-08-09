import type { UseFormRegister } from 'react-hook-form';
import MaxLengthMultiTextArea from '@/components/common/input/MaxLengthMultiTextInput';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

interface TextRowProps {
  index: number;
  revieweeName: string;
  iconIndex: number;
  questionIndex: number;
  register: UseFormRegister<Record<string, unknown>>;
  indicator: '강점' | '보완점';
}

export default function TextRow({
  index,
  revieweeName,
  register,
  iconIndex,
  questionIndex,
  indicator,
}: TextRowProps) {
  return (
    <div className="bg-gray-100 mb-2 flex w-full rounded-[20px] py-2 md:px-8">
      <div className="flex w-[320px] items-center gap-4">
        <CirclePlanetIcon className="bg-gray-100" iconIndex={iconIndex} />
        <span className="mr-4 mobile1">{revieweeName}</span>
      </div>
      <div className="flex w-full flex-col space-y-3">
        <MaxLengthMultiTextArea
          maxLength={50}
          placeholder={`${indicator}을 알려 주세요.`}
          className="h-[40px] w-full border-2"
          {...register(
            `responses[${questionIndex}].responseDetails[${index}].response.description`,
          )}
        />
        <MaxLengthMultiTextArea
          maxLength={200}
          placeholder={`자세한 예를 들어 설명해 ${indicator}을 알려 주세요.`}
          className="h-[60px] w-full border-2"
          {...register(`responses[${questionIndex}].responseDetails[${index}].response.example`)}
        />
      </div>
    </div>
  );
}
