import { ProjectCreateRequest, ProjectCreateResponse } from '@/models/project/projectApiModels';
import { createProject } from '@/services/api/projectApi';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateProject = (successCallback: () => void) => {
  return useMutation<ProjectCreateResponse, AxiosError, ProjectCreateRequest>({
    mutationFn: createProject,
    onSuccess: (response) => {
      console.log(response);
      if (successCallback) successCallback();
    },
    onError: (error) => {
      alert('프로젝트 등록에 실패했습니다.');
      console.log(error);
    },
  });
};
