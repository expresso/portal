import { DomainError } from '../DomainError'

export class UserExistsError extends DomainError {
  static readonly code = 'user_exists'

  constructor(
    field: 'email' | 'username',
    data: { email: string; username: string }
  ) {
    super(
      UserExistsError.code,
      `a user with ${field} '${data[field]}' already exsits`
    )
  }
}
