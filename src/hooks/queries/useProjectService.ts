import type {
  GetRegisteredProjectsResponse,
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectDeleteResponse,
} from '@/models/project/projectApiModels';
import { createProject, deleteProject, getRegisteredProjects } from '@/services/api/projectApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 프로젝트 생성하기
export const useCreateProject = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectCreateResponse, AxiosError, ProjectCreateRequest>({
    mutationFn: createProject,
    onSuccess: (response, variables) => {
      console.log(response);

      // 등록 프로젝트 리스트의 ui 변경을 위해 캐시된 데이터를 직접 수정 (서버 데이터를 refetch 하지 않기 위해 추가)
      // 등록 프로젝트 관리 페이지에서 새 프로젝트를 등록하면 UI도 갱신되어야 한다.
      queryClient.setQueryData<GetRegisteredProjectsResponse>(
        ['getRegisteredProjects'],
        (oldData) => {
          if (!oldData) return oldData;

          // 새 등록 프로젝트 객체 생성
          const newProject = {
            projectId: response.data.projectId, // 서버 응답에서 새 프로젝트 ID를 받아옴
            projectName: variables.projectName,
            organizationName: variables.organizationName,
            startDate: variables.startDate,
            endDate: variables.endDate,
            categories: variables.categories,
            surveyParcitipants: 0, // 새로 생성된 프로젝트이므로 참여자는 0으로 초기화
            visibility: true, // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
            userEvaluation: '', // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
          };
          return {
            ...oldData,
            data: [newProject, ...oldData.data],
          };
        },
      );

      if (successCallback) successCallback();
    },
    onError: (error) => {
      alert('프로젝트 등록에 실패했습니다.');
      console.log(error);
    },
  });
};

// 프로젝트 삭제하기
export const useDeleteProject = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectDeleteResponse, AxiosError, number>({
    mutationFn: deleteProject,
    onSuccess: (response, variant) => {
      console.log(response);

      // 등록 프로젝트 리스트의 ui 변경을 위해 캐시된 데이터를 직접 수정 (서버 데이터를 refetch 하지 않기 위해 추가)
      queryClient.setQueryData<GetRegisteredProjectsResponse>(
        ['getRegisteredProjects'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((project) => project.projectId !== variant),
          };
        },
      );

      if (successCallback) successCallback();
    },
    onError: (error) => {
      alert('프로젝트 삭제에 실패했습니다.');
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
