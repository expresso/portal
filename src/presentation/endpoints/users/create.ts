import { createEndpoint } from '@expresso/router'
import { PublicUserSchema, UserCreationSchema } from '../../../domain/User'
import { UserService } from '../../../services/UserService'
import { errorResponses } from '../../errors/HttpError'
import { rescue } from '../../middlewares/rescue'

const errorMap = { user_exists: 409 }

export const createUser = (
  userService: UserService
) =>
  createEndpoint({
    summary: 'Create a new user',
    tags: ['Users'],
    input: {
      body: UserCreationSchema
    },
    output: {
      201: PublicUserSchema,
      ...errorResponses(errorMap)
    },
    handlers: rescue(async (req, res) => {
      const { body } = req

      const user = await userService.create(body)

      res.status(201).json(user)
    }, errorMap)
  })
