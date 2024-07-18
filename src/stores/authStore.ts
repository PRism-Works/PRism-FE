import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const AUTH_STORE_NAME = 'auth-state';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (newAccessToken: string) => void;
  setRefreshToken: (newRefreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        login: (accessToken, refreshToken) =>
          set({
            isLoggedIn: true,
            accessToken,
            refreshToken,
          }),
        logout: () =>
          set({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
          }),
        setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
        setRefreshToken: (newRefreshToken) => set({ refreshToken: newRefreshToken }),
      }),
      {
        name: AUTH_STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

// 페이지 접속 시 최초 실행되며 로컬스토리지에 이전 사용 토큰이 있는지 확인, 있다면 해당 값 사용
// node 서버에서의 실행 방지를 위해 window 객체가 존재하는 브라우저일 때만 코드 실행
if (typeof window !== 'undefined') {
  // 로컬 스토리지에서 직접 상태를 가져오는 함수

  const getAuthStateFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem(AUTH_STORE_NAME);
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState);
          return parsedState.state as AuthState;
        } catch (error) {
          console.error('인증 로컬 저장소 parsing 실패: ', error);
        }
      }
    }
    return null;
  };

  const initializeAuth = () => {
    const storedState = getAuthStateFromStorage();

    if (storedState && storedState.accessToken && storedState.refreshToken) {
      useAuthStore.getState().login(storedState.accessToken, storedState.refreshToken);
    } else {
      useAuthStore.getState().logout();
    }
  };

  initializeAuth();
}
