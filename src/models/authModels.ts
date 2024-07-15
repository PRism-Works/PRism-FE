import { z } from 'zod';

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
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지 입력 가능합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.',
      )
      .refine(
        (val) => !/(.)\1{2}/.test(val),
        '비밀번호에 동일한 문자가 3회 이상 반복될 수 없습니다.',
      )
      .refine(
        (val) => !/(012|123|234|345|456|567|678|789|890)/.test(val),
        '비밀번호에 연속된 숫자가 3개 이상 포함될 수 없습니다.',
      )
      .refine((val) => !/\s/.test(val), '비밀번호에 공백이 포함될 수 없습니다.'),
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
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지 입력 가능합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.',
      )
      .refine(
        (val) => !/(.)\1{2}/.test(val),
        '비밀번호에 동일한 문자가 3회 이상 반복될 수 없습니다.',
      )
      .refine(
        (val) => !/(012|123|234|345|456|567|678|789|890)/.test(val),
        '비밀번호에 연속된 숫자가 3개 이상 포함될 수 없습니다.',
      )
      .refine((val) => !/\s/.test(val), '비밀번호에 공백이 포함될 수 없습니다.'),
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
