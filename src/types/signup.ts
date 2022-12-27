export interface FormValues {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
}

export interface SignupFormValues {
  email: string
  password: string
  nickname: string
  location?: string
}

export type CurrentType = (k: string, v: string) => void

export type ValidType = (k: string, v: boolean) => void
