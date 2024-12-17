import { UseFormReturn } from 'react-hook-form';
import { TeamRecruitFormValues } from '@/models/team/teamModels';

export default function usePositionManagement(form: UseFormReturn<TeamRecruitFormValues>) {
  const addNewPosition = () => {
    const currentPositions = form.watch('positions');
    form.setValue('positions', [...currentPositions, { title: undefined, count: undefined }]);
  };

  const removePosition = (index: number) => {
    const currentPositions = form.watch('positions');
    form.setValue(
      'positions',
      currentPositions.filter((_, i) => i !== index),
    );
  };

  return { addNewPosition, removePosition };
}
