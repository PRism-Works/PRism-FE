import {
  PRISM_EVALUATION_LABELS,
  type PRismEvaluation,
  type PRismEvaluationType,
} from '@/models/prism/prismModels';
import { ICONS } from '@/components/common/chart/PRismChart';
import { cn } from '@/lib/utils';

interface PRismExplanationProps {
  userName?: string;
  data: PRismEvaluation[];
}

export default function PRismExplanation({ data, userName = '' }: PRismExplanationProps) {
  const { highestEvaluations, lowestEvaluations } = findExtremeEvaluations(data);

  const getColorForEvaluation = (evaluation: PRismEvaluationType) => {
    if (highestEvaluations.includes(evaluation)) return 'text-info-500';
    if (lowestEvaluations.includes(evaluation)) return 'text-purple-500';
    return 'text-gray-500'; // 기본 색상
  };

  return (
    <div className="flex-wrap gap-12 flex-col-center">
      <div className="flex-wrap gap-10 flex-center">
        {data.map((item) => {
          const Icon = ICONS[item.evaluation];
          return (
            <span key={item.evaluation} className="gap-2 flex-col-center">
              <div className="text-gray-400 gap-1 mobile2 flex-col-center">
                <Icon className="stroke-black" />
                {PRISM_EVALUATION_LABELS[item.evaluation]}
              </div>
              <span className={cn('mobile1', getColorForEvaluation(item.evaluation))}>
                {item.percent}%
              </span>
            </span>
          );
        })}
      </div>
      <div className="text-gray-800 flex flex-col justify-center gap-4 display5">
        <p>
          {userName && `${userName}님의 `}
          <span className="text-info-500 mobile2">가장 높은 지표</span>는
          <span className="text-info-500 mx-2 display6">
            {highestEvaluations.map((evaluation) => PRISM_EVALUATION_LABELS[evaluation]).join(', ')}
          </span>
          입니다.
        </p>
        <p>
          {userName && `${userName}님의 `}
          <span className="text-purple-500 mobile2">가장 낮은 지표</span>는
          <span className="text-purple-500 mx-2 display6">
            {lowestEvaluations.map((evaluation) => PRISM_EVALUATION_LABELS[evaluation]).join(', ')}
          </span>
          입니다.
        </p>
      </div>
    </div>
  );
}

const findExtremeEvaluations = (data: PRismEvaluation[]) => {
  let maxPercent = -Infinity;
  let minPercent = Infinity;
  let highestEvaluations: PRismEvaluationType[] = [];
  let lowestEvaluations: PRismEvaluationType[] = [];

  data.forEach((item) => {
    if (item.percent > maxPercent) {
      maxPercent = item.percent;
      highestEvaluations = [item.evaluation];
    } else if (item.percent === maxPercent) {
      highestEvaluations.push(item.evaluation);
    }

    if (item.percent < minPercent) {
      minPercent = item.percent;
      lowestEvaluations = [item.evaluation];
    } else if (item.percent === minPercent) {
      lowestEvaluations.push(item.evaluation);
    }
  });

  return { highestEvaluations, lowestEvaluations };
};
