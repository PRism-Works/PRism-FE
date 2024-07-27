import { format, fromUnixTime, parse } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * 초(secondes)를 'mm:ss' 형태로 변환
 * @param seconds 초
 * @returns mm:ss
 */
export const formatSecondToMMSS = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

/**
 * Date 객체를 'yyyy년 MM월 dd일'로 변환
 * @param date Date 객체
 * @returns yyyy년 MM월 dd일
 */
export const formatDateToKoreanStyle = (date: Date): string =>
  format(date, 'yyyy년 MM월 dd일', { locale: ko });

/**
 * Date 객체를 'yyyyMMddHHmmss'로 변환
 * @param date Date 객체
 * @returns yyyyMMddHHmmss
 */
export const formatDateToYYYYMMDDHHmmss = (date: Date): string => {
  return format(date, 'yyyyMMddHHmmss');
};

/**
 * 'yyyyMMddHHmmss' 를 'yyyy-MM-dd'로 변환
 * @param dateString yyyyMMddHHmmss 형식의 문자열
 * @returns yyyy-MM-dd 형식의 문자열
 */
export const formatYYYYMMDDHHmmssToYYYYMMDD = (dateString: string): string => {
  const parsedDate = parse(dateString, 'yyyyMMddHHmmss', new Date());
  return format(parsedDate, 'yyyy-MM-dd');
};

/**
 * Date 객체를 'yyyy.MM.dd' 로 변환
 * @param date Date 객체
 * @returns yyyy.MM.dd
 */
export const formatDateToDotSeparatedYYYYMMDD = (date: Date): string => {
  return format(date, 'yyyy.MM.dd');
};

/**
 * "yyyy-MM-dd"를 Date 객체로 변환
 * @param dateString "yyyy-MM-dd" 형태의 문자열
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
 * Unix 타임스탬프(밀리초)를 Date 객체로 변환 (프로젝트 검색에서 사용)
 * @param timestamp Unix 타임스탬프 (밀리초)
 * @returns Date 객체
 */
export const convertTimestampToDate = (timestamp: number): Date => {
  try {
    return fromUnixTime(Math.floor(timestamp / 1000));
  } catch (error) {
    console.error('Invalid timestamp provided', error);
    return new Date(); // 오류 발생 시, 현재 날짜의 Date 객체 반환
  }
};
