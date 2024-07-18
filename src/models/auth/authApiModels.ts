export interface EmailExistsResponse {
  success: boolean;
  status: number;
  data: boolean;
}

export interface SendEmailCodeRequest {
  email: string;
  authType: 'SIGNUP' | 'RESET_PASSWORD';
}

export interface SendEmailCodeResponse {
  success: boolean;
  status: string;
  data: null;
}

export interface VerifyAuthCodeRequest {
  email: string;
  authCode: string;
  authType: 'SIGNUP' | 'RESET_PASSWORD';
}

export interface VerifyAuthCodeResponse {
  success: boolean;
  status: number;
  data: null;
}

export interface SignupRequest {
  username: string;
  email: string;
  authCode: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  status: number;
  data: {
    userId: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
