import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProjectFormSchema, type ProjectForm } from '@/models/project/projectModels';
import { useUserStore } from '@/stores/userStore';

export default function useProjectForm(defaultData?: ProjectForm) {
  const userData = useUserStore((state) => state.user);

  const formMethods = useForm<ProjectForm>({
    mode: 'onChange',
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      projectName: defaultData?.projectName || '',
      organizationName: defaultData?.organizationName || '',
      startDate: defaultData?.startDate || null,
      endDate: defaultData?.endDate || null,
      members: defaultData?.members || [
        {
          // 로그인 한 사용자 기본 세팅
          name: userData?.name || '',
          email: userData?.email || '',
          roles: userData?.roles || [],
        },
        {
          name: '',
          email: '',
          roles: [],
        },
      ],
      projectUrlLink: defaultData?.projectUrlLink || '',
      urlVisibility: defaultData?.urlVisibility || false,
      projectDescription: defaultData?.projectDescription || '',
      skills: defaultData?.skills || [],
      categories: defaultData?.categories || [],
    },
  });

  return { formMethods };
}
