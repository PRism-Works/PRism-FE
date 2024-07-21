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
export interface RegisteredProjectsResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    categories: string[];

    visibility: boolean; // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
    userEvaluation: string; // 필요 없지만 서버 데이터 형태를 맞추기 위해 추가한 필드
  }[];
}

// 연동할 프로젝트 리스트 가져오기
export interface LinkProjectResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    categories: string[];

    surveyParcitipants: number;
    userEvaluation: string;
    visibility: boolean;
  }[];
}

// 프로젝트 상세 조회
// 검색 상세조회, 프로젝트 수정 시 상세조회, 타인 프로젝트 상세조회 때 마다 재사용
export interface ProjectDetailResponse {
  success: boolean;
  status: number;
  data: {
    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    projectUrlLink: string;
    visibility: boolean;

    projectDescription: string;
    categories: string[];
    skills: string[];
    members: {
      name: string;
      email: string;
      roles: string[];
    }[];
    anonymousCount: number;
  };
}
