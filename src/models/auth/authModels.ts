import { z } from 'zod';
import {
  passwordMinLength,
  passwordMaxLength,
  passwordRegex,
  passwordRegexMessage,
  noRepeatingCharsRegex,
  noRepeatingCharsMessage,
  noSequentialDigitsRegex,
  noSequentialDigitsMessage,
  noWhitespaceRegex,
  noWhitespaceMessage,
} from '@/utils/passwordValidation';

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .max(30, '이름은 최대 30자까지 입력 가능합니다.')
      .regex(/^[가-힣a-zA-Z]+$/, '이름은 문자만 입력 가능합니다.'),
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
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z]+$/, '이름은 문자만 입력 가능합니다.'),
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
