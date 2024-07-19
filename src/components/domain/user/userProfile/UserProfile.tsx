import BorderCard from '@/components/common/card/BorderCard';
import CirclePlanetIcon from '../CirclePlanetIcon';

export default function UserProfile() {
  // NOTE: api 연동 이후 수정 예정
  const labels = ['이메일', '관심 직무', '기술 스택'];
  const items = [
    'PRism@gmail.com',
    '디자이너',
    'Figma, Protipie, Adobe XD, Adobe Photoshop, Figma, Figma, Protipie, Adobe XD, Adobe Photoshop, Figma',
  ];

  return (
    <div className="flex w-full">
      <div className="mr-4 flex h-[165px] w-[248px] flex-col items-center justify-center rounded-[30px] bg-gradient-to-br from-[#1E1B4B] via-[#1E1B4B] to-[#312E81] body6">
        <CirclePlanetIcon className="bg-white" />
        <span className="mt-2.5 text-white">안유경</span>
      </div>
      <BorderCard className="flex h-[165px] w-full min-w-0 max-w-[776px] flex-grow space-x-8 overflow-hidden p-8">
        <div className="flex w-[60px] flex-col space-y-4">
          {labels.map((label, index) => (
            <span key={index} className="whitespace-nowrap text-purple-800 display6">
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-4 overflow-y-auto">
          {items.map((item, index) => (
            <span key={index} className="text-gray-500 display4">
              {item}
            </span>
          ))}
        </div>
      </BorderCard>
    </div>
  );
}
