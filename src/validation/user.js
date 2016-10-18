// import memoize from 'lru-memoize'
import {
  createValidator,
  required,
  requiredIf,
  minLength,
  email,
  password,
  match,
} from './rules'


export const profileValidator = createValidator({
  email: [email],
  fullName: [required, minLength(5)],
  password: [requiredIf('passwordRequired'), password, minLength(6)],
  confirmPassword: [match('password')],
})

export const loginValidator = createValidator({
  email: [required],
  password: [required],
})

