import { useFormContext, type UseFormRegister } from 'react-hook-form';

interface CustomRadioButtonProps {
  name: string;
  value: number;
  register: UseFormRegister<Record<string, unknown>>;
}

export default function CustomRadioButton({ name, value, register }: CustomRadioButtonProps) {
  const { watch } = useFormContext();
  const isSelected = watch(name) === value.toString();

  return (
    <label className="relative flex cursor-pointer items-center space-x-4">
      <input type="radio" {...register(name)} value={value.toString()} className="hidden" />
      {/* value를 문자열로 변환하여 전달 */}
      <div className="relative flex h-6 w-6 items-center justify-center">
        <div
          className={`absolute h-full w-full rounded-full border-2 ${
            isSelected ? 'border-purple-500' : 'border-gray-300'
          }`}></div>
        <div
          className={`h-4 w-4 rounded-full ${isSelected ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
      </div>
    </label>
  );
}
