import axios from 'axios';
import { ax } from './axios';

interface EmailExistsResponse {
  success: boolean;
  status: number;
  data: boolean;
}

interface SendEmailCodeRequest {
  email: string;
  authType: 'SIGNUP' | 'RESET_PASSWORD';
}

interface SendEmailCodeResponse {
  success: boolean;
  status: string;
  data: null;
}

interface VerifyAuthCodeRequest {
  email: string;
  authCode: string;
  authType: 'SIGNUP' | 'RESET_PASSWORD';
}

interface VerifyAuthCodeResponse {
  success: boolean;
  status: number;
  data: null;
}

interface SignupRequest {
  username: string;
  email: string;
  authCode: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  status: number;
  data: {
    userId: string;
    email: string;
  };
}

// NOTE: 개발을 위해 임시로 로그를 많이 추가해두었습니다. 배포 전 삭제할 예정입니다.
export const checkEmailExists = async (email: string): Promise<EmailExistsResponse> => {
  try {
    const response = await ax.get<EmailExistsResponse>('/api/v1/auth/email/exists', {
      params: { email },
    });
    console.log('Email Exists Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`이메일 중복확인 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`이메일 중복확인 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`이메일 중복확인 실패: ${error}`);
      throw new Error(`이메일 중복확인 실패: ${error}`);
    }
  }
};

export const sendEmailCode = async (data: SendEmailCodeRequest): Promise<SendEmailCodeResponse> => {
  try {
    const response = await ax.post<SendEmailCodeResponse>('/api/v1/auth/code', data);
    console.log('Send Email Code Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`이메일 코드 발송 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`이메일 코드 발송 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`이메일 코드 발송 실패: ${error}`);
      throw new Error(`이메일 코드 발송 실패: ${error}`);
    }
  }
};

export const verifyAuthCode = async (
  data: VerifyAuthCodeRequest,
): Promise<VerifyAuthCodeResponse> => {
  try {
    const response = await ax.post<VerifyAuthCodeResponse>('/api/v1/auth/code/verification', data);
    console.log('Verify Auth Code Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`인증 코드 확인 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`인증 코드 확인 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`인증 코드 확인 실패: ${error}`);
      throw new Error(`인증 코드 확인 실패: ${error}`);
    }
  }
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await ax.post<SignupResponse>('/api/v1/auth/signup', data);
    console.log('Signup Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`회원가입 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`회원가입 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`회원가입 실패: ${error}`);
      throw new Error(`회원가입 실패: ${error}`);
    }
  }
};
