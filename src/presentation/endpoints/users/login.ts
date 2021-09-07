import { createEndpoint } from '@expresso/router'
import { z } from 'zod'
import { AuthService } from '../../../services/AuthService'
import { rescue } from '../../middlewares/rescue'

const errorMap = { unauthorized: 401 }

export const login = (authService: AuthService) =>
  createEndpoint({
    summary: 'Get a new auth token',
    tags: ['Users'],
    input: {
      body: z.object({
        login: z.string().min(1),
        password: z.string().min(1)
      })
    },
    output: {
      200: z.object({ token: z.string() })
    },
    handlers: rescue(async (req, res) => {
      const { login, password } = req.body
      const token = await authService.login(login, password)

      res.status(200).json({ token })
    }, errorMap)
  })
