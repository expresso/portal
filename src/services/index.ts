import { Repositories } from '../data/repository'
import { AuthService } from './AuthService'
import { UserService } from './UserService'

export class Services {
  public readonly userService: UserService
  public readonly authService: AuthService

  constructor(private readonly repositories: Repositories, jwtSecret: string) {
    this.authService = new AuthService(jwtSecret, repositories.userRepository)
    this.userService = new UserService(this.repositories.userRepository)
  }
}
