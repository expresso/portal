import jwt, { SignOptions } from 'jsonwebtoken'
import { UserRepository } from '../data/repository/UserRepository'
import { UnauthorizadError } from '../domain/errors/user/Unauthorized'
import { PublicUser, PublicUserSchema } from '../domain/User'
import argon2 from 'argon2'
import { ObjectID, ObjectId } from 'bson'
import { ObjectId as MongoObjectId } from 'mongodb'

export class AuthService {
  private readonly signOptions: SignOptions
  constructor(
    private readonly jwtSecret: string,
    private readonly userRepository: UserRepository
  ) {
    this.signOptions = {
      algorithm: 'HS512',
      audience: '@expresso/portal',
      issuer: '@expresso/portal',
      expiresIn: '1h'
    }
  }

  private getOptionsForUser(user: PublicUser) {
    return {
      ...this.signOptions,
      subject: user._id.toString()
    }
  }

  public getToken(user: PublicUser) {
    return jwt.sign(user, this.jwtSecret, this.getOptionsForUser(user))
  }

  public async login(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login)
    const isPasswordValid = await argon2.verify(
      user?.password || '',
      password,
      { type: argon2.argon2id }
    )

    if (!user || !isPasswordValid) {
      throw new UnauthorizadError('invalid login or password')
    }

    console.log(user._id instanceof ObjectID, user._id instanceof ObjectId, user._id instanceof MongoObjectId)

    return this.getToken(PublicUserSchema.parse(user))
  }
}
