import { Routing } from '@expresso/router'
import { Services } from '../../services'
import { createUser } from './users/create'
import { login } from './users/login'

export const getRoutes = (services: Services): Routing => ({
  '/users': {
    post: createUser(services.userService)
  },
  '/login': {
    post: login(services.authService)
  }
})
