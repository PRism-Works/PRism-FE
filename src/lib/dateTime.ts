import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * @param seconds mm:ss 형태로 변환될 초
 * @returns mm:ss
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

/**
 * @param date yyyy년 MM월 dd일로 변환될 Date 객체
 * @returns yyyy년 MM월 dd일
 */
export const formatDateToKoreanStyle = (date: Date): string =>
  format(date, 'yyyy년 MM월 dd일', { locale: ko });

/**
 * @param date yyyyMMddHHmmss로 변환될 Date 객체
 * @returns yyyyMMddHHmmss
 */
export const formatDateToYYYYMMDDHHmmss = (date: Date): string => {
  return format(date, 'yyyyMMddHHmmss');
};

/**
 *
 * @param date yyyy.MM.dd로 변환될 Date 객체
 * @returns yyyy.MM.dd
 */
export const formatDateToDotSeparatedYYYYMMDD = (date: Date): string => {
  return format(date, 'yyyy.MM.dd');
};
