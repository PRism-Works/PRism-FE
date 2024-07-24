import { Angry, Annoyed, Meh, Smile, Laugh } from 'lucide-react';

const options = [
  { label: '전혀 아니요', icon: <Angry /> },
  { label: '대체로 아니요', icon: <Annoyed /> },
  { label: '그럭저럭이요', icon: <Meh /> },
  { label: '대체로 그래요', icon: <Smile /> },
  { label: '매우 그래요', icon: <Laugh /> },
];

export default function RatingScale() {
  return (
    <div className="m-2 flex max-w-[730px] space-x-11">
      {options.map((option, index) => (
        <div key={index} className="my-2 gap-2 flex-col-center">
          {option.icon}
          <span className="mobile1">{option.label}</span>
        </div>
      ))}
    </div>
  );
}
