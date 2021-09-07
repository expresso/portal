import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors/HttpError'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      error: { code: err.code, message: err.message }
    })
  }

  console.error(err)

  return res
    .status(500)
    .json({
      status: 500,
      error: { code: 'internal_server_error', message: 'Internal server error' }
    })
}
