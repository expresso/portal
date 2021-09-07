import { Db } from 'mongodb'
import { UserRepository } from './UserRepository'

export class Repositories {
  public readonly userRepository: UserRepository

  constructor (db: Db) {
    this.userRepository = new UserRepository(db)
  }
}
