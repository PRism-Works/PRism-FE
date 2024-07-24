import { format, fromUnixTime, parse } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * @param seconds mm:ss 형태로 변환될 초
 * @returns mm:ss
 */
export const formatSecondToMMSS = (seconds: number): string => {
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

/**
 * @param dateString yyyyMMddHHmmss 형식의 문자열
 * @returns yyyy-MM-dd 형식의 문자열
 */
export const formatYYYYMMDDHHmmssToYYYYMMDD = (dateString: string): string => {
  const parsedDate = parse(dateString, 'yyyyMMddHHmmss', new Date());
  return format(parsedDate, 'yyyy-MM-dd');
};

/**
 * @param dateString Date 객체로 변환될 "yyyy-MM-dd" 형태의 문자열
 * @returns Date 객체
 */
export const convertStringToDate = (dateString: string): Date => {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date string provided');
    return new Date(); // 오류 발생 시, 오늘 날짜를 보내준다.
  }

  return parsedDate;
};

/**
 * Unix 타임스탬프(밀리초)를 "yyyy-MM-dd" 형태의 문자열로 변환 (프로젝트 검색에서 사용)
 * @param timestamp Unix 타임스탬프 (밀리초)
 * @returns "yyyy-MM-dd" 형태의 문자열
 */
export const convertTimestampToDateString = (timestamp: number): string => {
  try {
    // 밀리초를 초로 변환
    const date = fromUnixTime(timestamp / 1000);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Invalid timestamp provided', error);
    return format(new Date(), 'yyyy-MM-dd'); // 오류 발생 시, 오늘 날짜를 문자열로 반환
  }
};
