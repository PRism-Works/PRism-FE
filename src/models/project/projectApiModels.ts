// 서버에서 받아오는 카테고리 리스트 데이터 형식
interface CategoryResponse {
  id: number;
  category: {
    categoryId: number;
    name: string;
  };
}

// 프로젝트 등록 요청
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

    memberCount: number;
    projectDescription: string;
    skills: string[];

    categories: CategoryResponse[];

    startDate: string;
    endDate: string;

    projectUrlLink: string;
    urlVisibility: boolean;
    createdBy: string | null;
  };
}

// 프로젝트 수정
// 프로젝트 산출물의 공개, 비공개 여부 추가 필요
export interface ProjectUpdateRequest {
  projectName: string;
  projectDescription: string;
  organizationName: string;
  memberCount: number;
  categories: string[];
  skills: string[];

  startDate: string;
  endDate: string;

  projectUrlLink: string;
  // urlVisibility: boolean;

  members: {
    name: string;
    email: string;
    roles: string[];
    anonyVisibility?: boolean; // put api여서 일단 필수값은 아니게 처리
  }[];
}
export interface ProjectUpdateResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;
    projectName: string;
    projectDescription: string;
    organizationName: string;
    memberCount: number;
    categories: CategoryResponse[];
    skills: string[];

    startDate: string;
    endDate: string;
    projectUrlLink: string;
    // urlVisibility: boolean;
    createdBy: string | null;
  };
}

// 프로젝트 삭제
export interface ProjectDeleteResponse {
  success: boolean;
  status: number;
  data: null;
}

// 프로젝트 리스트 받아올 때 Response 형태
// 내가 참여한 프로젝트 리스트, 내가 등록한 프로젝트 리스트, 연동할 프로젝트 리스트, 타인이 참여한 프로젝트 리스트
export interface ProjectListResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    categories: string[];

    urlVisibility: boolean;
    userEvaluation: string;
    surveyParticipants: number;

    anonyVisibility?: boolean;
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
    urlVisibility: boolean;

    projectDescription: string;
    categories: string[];
    skills: string[];
    members: {
      userId: string;
      name: string;
      email: string;
      roles: string[];
      anonyVisibility: boolean;
    }[];
    anonymousCount: number;
    mostCommonTraits?: string;
  };
}

// 본인이 참여한 프로젝트의 본인 익명 여부
export interface MyProjectVisibilityRequest {
  projectId: number;
  visibility: boolean;
}
export interface MyProjectVisibilityResponse {
  projectId: number;
  visibility: boolean;
}

// 프로젝트 검색 요청
export interface ProjectSearchRequest {
  searchType: 'MEMBER_NAME' | 'PROJECT_NAME';
  searchWord: string;
  categories: number[]; // 상세 검색 필터, category별 id
  pageNo: number; // 페이지 번호 0부터 시작 (필수), 페이지 번호는 백엔드에서 0부터 시작하기 때문에 프론트 상에 현재 페이지가 2라면 1을 보내야함
  pageSize: number; // 한 페이지에 나올 개수 (필수)
}
// 프로젝트 검색 응답
export interface ProjectSearchResponse {
  success: boolean;
  status: number;
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    contents: {
      projectId: number;
      projectName: string;
      organizationName: string;
      categories: string[];
      startDate: number; // 타임스태프 형태
      endDate: number; // 타임스태프 형태
    }[];
  };
}

// 프로젝트 연동 요청
export interface LinkProjectRequest {
  projectId: number;
  anonymousEmail: string;
}
