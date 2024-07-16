export const passwordMinLength = 8;
export const passwordMaxLength = 20;

// 비밀번호 유효성 검사 정규식: 영문, 숫자, 특수문자 중 2가지 이상 포함
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
export const passwordRegexMessage =
  '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';

// 비밀번호 내 동일한 문자 3회 이상 반복 금지
export const noRepeatingCharsRegex = /(.)\1{2}/;
export const noRepeatingCharsMessage = '비밀번호에 동일한 문자가 3회 이상 반복될 수 없습니다.';

// 비밀번호 내 연속된 숫자 3개 이상 포함 금지
export const noSequentialDigitsRegex = /(012|123|234|345|456|567|678|789|890)/;
export const noSequentialDigitsMessage = '비밀번호에 연속된 숫자가 3개 이상 포함될 수 없습니다.';

// 비밀번호 내 공백 포함 금지
export const noWhitespaceRegex = /\s/;
export const noWhitespaceMessage = '비밀번호에 공백이 포함될 수 없습니다.';
