import { Angry, Annoyed, Meh, Smile, Laugh } from 'lucide-react';

const options = [
  { value: '1', label: '전혀 아니요', icon: <Angry /> },
  { value: '2', label: '대체로 아니요', icon: <Annoyed /> },
  { value: '3', label: '그럭저럭이요', icon: <Meh /> },
  { value: '4', label: '대체로 그래요', icon: <Smile /> },
  { value: '5', label: '매우 그래요', icon: <Laugh /> },
];

export default function RatingScale() {
  return (
    <div className="m-2 flex max-w-[730px] space-x-11">
      {options.map((option) => (
        <div key={option.value} className="my-2 gap-2 flex-col-center">
          {option.icon}
          <span className="mobile1">{option.label}</span>
        </div>
      ))}
    </div>
  );
}
