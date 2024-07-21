// 서버에서 받아오는 카테고리 리스트 데이터 형식
interface CategoryResponse {
  id: number;
  category: {
    categoryId: number;
    name: string;
  };
}

// 프로젝트 등록
export interface ProjectCreateRequest {
  projectName: string;
  organizationName: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  projectUrlLink: string;
  projectDescription: string;
  skills: string[];

  categories: string[];
  members: {
    name: string;
    email: string;
    roles: string[];
  }[];
}

export interface ProjectCreateResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;
    memberCount: number;
    projectUrlLink: string;
    projectDescription: string;
    skills: string[];

    categories: CategoryResponse[];
  };
}

// 프로젝트 수정
// 프로젝트 산출물의 공개, 비공개 여부 추가 필요
export interface ProjectUpdateRequest {
  projectName: string;
  organizationName: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  projectUrlLink: string;
  projectDescription: string;
  skills: string[];

  categories: string[];

  members: {
    name: string;
    email: string;
    roles: string[];
  }[];
}
export interface ProjectUpdateResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;
    memberCount: number;
    projectUrlLink: string;
    projectDescription: string;
    skills: string[];

    categories: CategoryResponse[];
  };
}

// 프로젝트 삭제
export interface ProjectDeleteResponse {
  success: boolean;
  status: number;
  data: null;
}

// 등록한 프로젝트 리스트 가져오기
export interface GetRegisteredProjectsResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    categories: string[];

    visibility: boolean; // 필요 없는데..
    userEvaluation: string; // 필요 없는데..
    surveyParcitipants: number;
  }[];
}
