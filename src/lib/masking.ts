/**
 * 이름 마스킹: 첫 글자만 보이고 나머지는 '*'로 처리
 * @param name 마스킹 처리 할 이름 문자열
 * @returns x***
 */
export const maskName = (name: string): string => {
  return name.charAt(0) + '*'.repeat(Math.max(name.length - 1, 1));
};

/**
 * 이메일 마스킹: '@' 앞 2글자만 보이고 나머지는 '*'로 처리, '@' 이후는 그대로 유지
 * @param email 마스킹 처리할 이메일 형식의 문자열
 * @returns xy***@github.com
 */
export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  let maskedLocal = local.slice(0, 2) + '*'.repeat(Math.max(local.length - 2, 0));
  if (maskedLocal.length === 1) maskedLocal += '**'; // 이메일 앞 글자가 1자리일 경우, ** 를 더해주기
  return `${maskedLocal}@${domain}`;
};
