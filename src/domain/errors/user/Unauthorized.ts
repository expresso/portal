import { DomainError } from '../DomainError'

export class UnauthorizadError extends DomainError {
  constructor(message: string) {
    super('unauthorized', message)
  }
}
