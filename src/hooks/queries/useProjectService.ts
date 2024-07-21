import type {
  GetRegisteredProjectsResponse,
  ProjectCreateRequest,
  ProjectCreateResponse,
} from '@/models/project/projectApiModels';
import { createProject, getRegisteredProjects } from '@/services/api/projectApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 프로젝트 생성하기
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

// 내가 등록한 프로젝트 리스트 가져오기
export const useGetRegisteredProjects = () => {
  return useQuery<GetRegisteredProjectsResponse, AxiosError>({
    queryKey: ['getRegisteredProjects'],
    queryFn: () => getRegisteredProjects(),
  });
};
