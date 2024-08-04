import { Flag, Puzzle, Users, Wand2, Wrench } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  COMMUNICATION: Users,
  PROACTIVITY: Wand2,
  PROBLEM_SOLVING: Wrench,
  RESPONSIBILITY: Flag,
  COOPERATION: Puzzle,
};

const PRISM_EVALUATION_LABELS: Record<string, string> = {
  COMMUNICATION: '의사소통능력',
  PROACTIVITY: '적극성',
  PROBLEM_SOLVING: '문제해결능력',
  RESPONSIBILITY: '책임감',
  COOPERATION: '협동심',
};

export default function ChartIndicators() {
  return (
    <div className="flex justify-center space-x-4 py-10 sm:space-x-12 md:space-x-16 lg:space-x-24">
      {Object.keys(ICONS).map((type) => {
        const Icon = ICONS[type];
        const label = PRISM_EVALUATION_LABELS[type];

        return (
          <div key={type} className="flex flex-col items-center justify-center">
            <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            <span className="mt-2 text-sm text-white">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
