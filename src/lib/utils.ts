import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param seconds mm:ss 형태로 변환될 초
 * @returns mm:ss
 */
export const formatTime = (seconds: number) => {
  // 주어진 초를 분 단위로 변환하여 정수 부분 계산 후 60으로 나눈 나머지를 초 단위로 변환
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // 분과 초를 분:초 형식의 문자열로 반환. 초가 10보다 작으면 앞에 0을 추가
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

/**
 *
 * @param date yyyy년 MM월 dd일로 변환될 Date 객체
 * @returns yyyy년 MM월 dd일
 */
export const formatDateToKoreanStyle = (date: Date) =>
  format(date, 'yyyy년 MM월 dd일', { locale: ko });
