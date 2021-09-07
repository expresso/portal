import { z } from 'zod'

export class HttpError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public readonly message: string
  ) {
    super(message)
  }
}

export const errorResponses = (errorMap: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(errorMap).map(([code, status]) => [
      status,
      z.object({
        status: z.literal(status),
        error: z.object({ code: z.literal(code), message: z.string() })
      })
    ])
  )
