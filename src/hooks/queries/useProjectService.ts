import { convertStringToDate, formatYYYYMMDDHHmmssToYYYYMMDD } from '@/lib/dateTime';
import type {
  ProjectListResponse,
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectDeleteResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDetailResponse,
  MyProjectVisibilityResponse,
  MyProjectVisibilityRequest,
  LinkProjectRequest,
  ProjectSearchResponse,
  ProjectSearchRequest,
} from '@/models/project/projectApiModels';
import { ProjectForm } from '@/models/project/projectModels';
import {
  createProject,
  deleteProject,
  getEditProjectDetails,
  getLinkProjectsByProjectName,
  getMeInvolvedProjects,
  getMyProjectDetails,
  getProjectDetails,
  getRegisteredProjects,
  getSearchProjects,
  getWhoInvolvedProjects,
  linkProject,
  updateMyProjectVisibility,
  updateProject,
} from '@/services/api/projectApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 프로젝트 생성하기
export const useCreateProject = (successCallback: (projectId: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation<ProjectCreateResponse, AxiosError, ProjectCreateRequest>({
    mutationFn: createProject,
    onSuccess: (response, requestProjectData) => {
      const createdProjectId = response.data.projectId;
      console.log(response);

      // 등록 프로젝트 리스트의 ui 변경을 위해 캐시된 데이터를 직접 수정 (서버 데이터를 refetch 하지 않기 위해 추가)
      // 등록 프로젝트 관리 페이지에서 새 프로젝트를 등록하면 UI도 갱신되어야 한다.
      queryClient.setQueryData<ProjectListResponse>(['getRegisteredProjects'], (oldData) => {
        if (!oldData) return oldData;

        // 새 등록 프로젝트 객체 생성
        const newProject = {
          projectId: response.data.projectId, // 서버 응답에서 새 프로젝트 ID를 받아옴
          projectName: requestProjectData.projectName,
          organizationName: requestProjectData.organizationName,
          startDate: formatYYYYMMDDHHmmssToYYYYMMDD(requestProjectData.startDate),
          endDate: formatYYYYMMDDHHmmssToYYYYMMDD(requestProjectData.endDate),
          categories: requestProjectData.categories,
          surveyParticipants: 0, // 새로 생성된 프로젝트이므로 참여자는 0으로 초기화
          urlVisibility: true, // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
          userEvaluation: '', // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
        };
        return {
          ...oldData,
          data: [newProject, ...oldData.data],
        };
      });

      // 참여 프로젝트 리스트 무효화 (setQueryData가 적용이 안되어 처리)
      queryClient.invalidateQueries({ queryKey: ['getParticipatingProjects'] });

      if (successCallback) successCallback(createdProjectId);
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
    onSuccess: (response, requestProjectId) => {
      console.log(response);

      // 등록 프로젝트 리스트의 ui 변경을 위해 캐시된 데이터를 직접 수정 (서버 데이터를 refetch 하지 않기 위해 추가)
      queryClient.setQueryData<ProjectListResponse>(['getRegisteredProjects'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((project) => project.projectId !== requestProjectId),
        };
      });

      if (successCallback) successCallback();
    },
    onError: (error) => {
      alert('프로젝트 삭제에 실패했습니다.');
      console.log(error);
    },
  });
};

// 프로젝트 수정하기
export const useUpdateProject = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    ProjectUpdateResponse,
    AxiosError,
    { projectId: number; data: ProjectUpdateRequest }
  >({
    mutationFn: ({ projectId, data }) => updateProject(projectId, data),
    onSuccess: (response, { projectId, data }) => {
      // 등록 프로젝트 관리 페이지에서 프로젝트를 수정하면 UI도 갱신되어야 한다.
      queryClient.setQueryData<ProjectListResponse>(['getRegisteredProjects'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((project) =>
            project.projectId === projectId
              ? {
                  ...project,
                  projectName: data.projectName,
                  organizationName: data.organizationName,
                  startDate: formatYYYYMMDDHHmmssToYYYYMMDD(data.startDate),
                  endDate: formatYYYYMMDDHHmmssToYYYYMMDD(data.endDate),
                  categories: data.categories,
                }
              : project,
          ),
        };
      });

      if (successCallback) successCallback();
    },
    onError: (error) => {
      alert('프로젝트 수정에 실패했습니다.');
      console.log(error);
    },
  });
};

// 프로젝트 수정을 위해 상세 데이터 조회하기 (클릭 시 조회를 목적으로 하기에 mutaion 사용)
export const useGetProjectDetails = (successCallback: (projectDetailData: ProjectForm) => void) => {
  return useMutation<ProjectDetailResponse, AxiosError, number>({
    mutationFn: getEditProjectDetails,
    onSuccess: (response) => {
      console.log('프로젝트 상세 정보 조회 성공:', response);

      const detailData = response.data;
      const projectDetilData: ProjectForm = {
        projectName: detailData.projectName,
        organizationName: detailData.organizationName,
        startDate: convertStringToDate(detailData.startDate), // yyyy-MM-dd -> Date 객체
        endDate: convertStringToDate(detailData.endDate),
        members: detailData.members,
        projectUrlLink: detailData.projectUrlLink,
        urlVisibility: detailData.urlVisibility,
        projectDescription: detailData.projectDescription,
        skills: detailData.skills,
        categories: detailData.categories,
      };

      if (successCallback) successCallback(projectDetilData);
    },
    onError: (error) => {
      alert('프로젝트 상세 정보 조회에 실패했습니다.');
      console.error('프로젝트 상세 정보 조회 실패:', error);
    },
  });
};

// 특정 프로젝트에서 본인의 익명 처리 여부 설정 (공개/비공개)
export const useUpdateMyProjectVisibility = (successCallback: (checked: boolean) => void) => {
  return useMutation<MyProjectVisibilityResponse, AxiosError, MyProjectVisibilityRequest>({
    mutationFn: updateMyProjectVisibility,
    onSuccess: (response, requsetCondition) => {
      console.log(response);
      if (successCallback) successCallback(requsetCondition.visibility);
    },
    onError: (error) => {
      alert('프로젝트 공개 설정에 실패했습니다.');
      console.log(error);
    },
  });
};

// 프로젝트 연동하기
export const useLinkProject = () => {
  return useMutation<ProjectDetailResponse, AxiosError, LinkProjectRequest>({
    mutationFn: linkProject,
    onError: (error) => {
      alert('프로젝트 연동 요청에 실패했습니다.');
      console.log(error);
    },
  });
};

// 홈, 검색 페이지에서 프로젝트 검색하기 (Mutaion)
export const useSearchProjects = (condition: ProjectSearchRequest) => {
  return useQuery<ProjectSearchResponse, AxiosError>({
    queryKey: [
      'getSearchProjects',
      condition.searchType,
      condition.searchWord,
      [...condition.categories],
      condition.pageNo,
      condition.pageSize,
    ],
    queryFn: () => getSearchProjects(condition),
    enabled: !(condition.searchWord === '' && condition.categories.length === 0), // keyword나 categories가 둘 다 비어있으면 실행하지 않음
  });
};

// 내가 등록한 프로젝트 리스트 가져오기
export const useGetRegisteredProjects = () => {
  return useQuery<ProjectListResponse, AxiosError>({
    queryKey: ['getRegisteredProjects'],
    queryFn: () => getRegisteredProjects(),
  });
};

// 프로젝트 이름으로 연동할 프로젝트 리스트 가져오기
export const useGetLinkProjectsByProjectName = (projectName: string) => {
  return useQuery<ProjectListResponse, AxiosError>({
    queryKey: ['getLinkProjectsByProjectName', projectName],
    queryFn: () => getLinkProjectsByProjectName(projectName),
    enabled: !!projectName, // projectName이 존재할 때만 쿼리 실행
  });
};

// 프로필 별 로그인 유저 혹은 타인의 참여한 프로젝트 리스트 가져오기
export const useGetParticipatingProjects = (fromMyProfile: boolean, userId: string) => {
  return useQuery<ProjectListResponse, AxiosError>({
    queryKey: ['getParticipatingProjects', userId, fromMyProfile],
    queryFn: () => (fromMyProfile ? getMeInvolvedProjects() : getWhoInvolvedProjects(userId)),
    enabled: fromMyProfile || !!userId, // fromMyProfile이 true이거나 userId가 존재할 때만 쿼리 실행
  });
};

// 나 또는 타인의 프로젝트 상세 조회하기
export const useGetProfileProjectDetails = (fromMyProfile: boolean, projectId: number) => {
  return useQuery<ProjectDetailResponse, AxiosError>({
    queryKey: ['getProfileProjectDetails', projectId, fromMyProfile],
    queryFn: () => (fromMyProfile ? getMyProjectDetails(projectId) : getProjectDetails(projectId)),
    enabled: !!projectId, // projectId가 존재할 때만 쿼리 실행
  });
};
