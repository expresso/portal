import argon2 from 'argon2'
import { ObjectId } from 'mongodb'
import { UserRepository } from '../data/repository/UserRepository'
import { UserExistsError } from '../domain/errors/user/UserExistsError'
import {
  PublicUser,
  PublicUserSchema,
  User,
  UserCreationParams
} from '../domain/User'

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(data: UserCreationParams): Promise<PublicUser> {
    const userExists = await this.repository.exists(data.username, data.email)

    if (userExists) {
      throw new UserExistsError(userExists, data)
    }

    const userData: User = {
      ...data,
      _id: new ObjectId(),
      password: await argon2.hash(data.password, { type: argon2.argon2id }),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const user = await this.repository.save(userData)

    return PublicUserSchema.parse(user)
  }
}
