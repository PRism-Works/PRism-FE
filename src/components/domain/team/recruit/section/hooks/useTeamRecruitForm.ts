import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TeamRecruitFormSchema,
  type TeamRecruitFormValues,
  DEFAULT_TEAM_RECRUIT_VALUES,
} from '@/models/team/teamModels';

export default function useTeamRecruitForm(projectId: string) {
  const form = useForm<TeamRecruitFormValues>({
    resolver: zodResolver(TeamRecruitFormSchema),
    defaultValues: {
      ...DEFAULT_TEAM_RECRUIT_VALUES,
      projectId,
    },
  });

  const onSubmit = (values: TeamRecruitFormValues) => {
    console.log(values);
  };

  return { form, onSubmit };
}
