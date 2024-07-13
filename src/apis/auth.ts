import { ax } from './axios';

interface EmailExistsResponse {
  success: boolean;
  status: number;
  data: boolean;
}

export const checkEmailExists = async (email: string): Promise<EmailExistsResponse> => {
  try {
    const response = await ax.get<EmailExistsResponse>('/api/v1/auth/email/exists', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error(`이메일 중복확인 실패: ${error}`);
    throw new Error(`이메일 중복확인 실패: ${error}`);
  }
};
