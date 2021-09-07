import { Handler } from '@expresso/router'
import { DomainError } from '../../domain/errors/DomainError'
import { HttpError } from '../errors/HttpError'

export const rescue =
  (
    handler: Handler<any, any, any, any>,
    errorMap: Record<string, number>
  ): Handler<any, any, any, any> =>
  async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      if (!(err instanceof DomainError)) return next(err)
      if (!(err.code in errorMap)) return next(err)

      next(new HttpError(err.code, errorMap[err.code], err.message))
    }
  }
