import { ObjectId } from 'bson'
import { z } from 'zod'

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string().min(1),
  username: z.string().min(3),
  email: z.string().min(1),
  password: z.string().min(1),
  role: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const UserCreationSchema = UserSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true
})

export const PublicUserSchema = UserSchema.transform(
  ({ password, ...user }) => user
)

export type User = z.infer<typeof UserSchema>
export type PublicUser = z.infer<typeof PublicUserSchema>
export type UserCreationParams = z.infer<typeof UserCreationSchema>
