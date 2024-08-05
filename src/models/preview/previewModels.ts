export const SAVE_TYPE = {
  PROJECT: 'PROJECT',
  PROFILE: 'PROFILE',
} as const;

export type SaveType = (typeof SAVE_TYPE)[keyof typeof SAVE_TYPE];
