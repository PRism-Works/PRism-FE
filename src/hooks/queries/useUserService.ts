import { useMutation, useQuery } from '@tanstack/react-query';
import { userProfileDataByUserId, updateProfile } from '@/services/api/userApi';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfileResponse,
} from '@/models/user/userApiModels';
import { AxiosError } from 'axios';
import { User } from '@/models/user/userModels';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';

// userId로 특정 사용자의 Profile Data 가져오기
export const useUserProfileByUserId = (userId: string) => {
  return useQuery<UserProfileResponse, AxiosError>({
    queryKey: ['userProfileByUserId', userId],
    queryFn: () => userProfileDataByUserId(userId),
    retry: false,
  });
};

// 로그인 한 사용자의 프로필 수정하기
export const useUpdateProfile = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  return useMutation<UpdateProfileResponse, AxiosError, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (_, variables) => {
      alert('프로필이 성공적으로 수정되었습니다.');

      // 저장 성공 시, zustand의 전역 상태 업데이트 해주기
      const userNewData: User = {
        userId: user?.userId || '',
        email: user?.email || '',
        name: variables?.username || '',
        roles: variables?.interestJobs || [],
        skills: variables?.skills || [],
      };
      setUser(userNewData);

      // 마이 페이지로 이동
      router.push('/mypage');
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
