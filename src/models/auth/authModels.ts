import { z } from 'zod';

const passwordMinLength = 8;
const passwordMaxLength = 20;

export const nameRegex = /^[가-힣a-zA-Z]+$/;
export const nameRegexMessage = '이름은 문자만 입력 가능합니다.';

// 비밀번호 유효성 검사 정규식: 영문, 숫자, 특수문자 중 2가지 이상 포함
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const passwordRegexMessage = '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';

// 비밀번호 내 동일한 문자 3회 이상 반복 금지
const noRepeatingCharsRegex = /(.)\1{2}/;
const noRepeatingCharsMessage = '비밀번호에 동일한 문자가 3회 이상 반복될 수 없습니다.';

// 비밀번호 내 연속된 숫자 3개 이상 포함 금지
const noSequentialDigitsRegex = /(012|123|234|345|456|567|678|789|890)/;
const noSequentialDigitsMessage = '비밀번호에 연속된 숫자가 3개 이상 포함될 수 없습니다.';

// 비밀번호 내 공백 포함 금지
const noWhitespaceRegex = /\s/;
const noWhitespaceMessage = '비밀번호에 공백이 포함될 수 없습니다.';

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .max(10, '이름은 최대 10자까지 입력 가능합니다.')
      .regex(nameRegex, nameRegexMessage),
    email: z
      .string()
      .email('올바른 이메일을 입력해 주세요.')
      .max(100, '이메일 주소는 최대 100자까지 입력 가능합니다.'),
    certification: z.string(),
    password: z
      .string()
      .min(passwordMinLength, `비밀번호는 최소 ${passwordMinLength}자 이상이어야 합니다.`)
      .max(passwordMaxLength, `비밀번호는 최대 ${passwordMaxLength}자까지 입력 가능합니다.`)
      .regex(passwordRegex, passwordRegexMessage)
      .refine((val) => !noRepeatingCharsRegex.test(val), noRepeatingCharsMessage)
      .refine((val) => !noSequentialDigitsRegex.test(val), noSequentialDigitsMessage)
      .refine((val) => !noWhitespaceRegex.test(val), noWhitespaceMessage),
    verifyPassword: z.string(),
  })
  .superRefine(({ password, verifyPassword }, ctx) => {
    if (password !== verifyPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['verifyPassword'],
      });
    }
  });

export const LoginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호를 확인해주세요.'),
});

export const ResetPasswordSchema = z
  .object({
    email: z.string().email('올바른 이메일을 입력해 주세요.'),
    certification: z.string(),
    newPassword: z
      .string()
      .min(passwordMinLength, `비밀번호는 최소 ${passwordMinLength}자 이상이어야 합니다.`)
      .max(passwordMaxLength, `비밀번호는 최대 ${passwordMaxLength}자까지 입력 가능합니다.`)
      .regex(passwordRegex, passwordRegexMessage)
      .refine((val) => !noRepeatingCharsRegex.test(val), noRepeatingCharsMessage)
      .refine((val) => !noSequentialDigitsRegex.test(val), noSequentialDigitsMessage)
      .refine((val) => !noWhitespaceRegex.test(val), noWhitespaceMessage),
    verifyNewPassword: z.string(),
  })
  .superRefine(({ newPassword, verifyNewPassword }, ctx) => {
    if (newPassword !== verifyNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['verifyNewPassword'],
      });
    }
  });

export type SignupForm = z.infer<typeof SignupSchema>;
export type LoginForm = z.infer<typeof LoginSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
