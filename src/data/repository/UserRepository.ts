import { User } from '../../domain/User'
import { MongodbRepository } from '@irontitan/mongodb-data-layer'
import { Db } from 'mongodb'


export class UserRepository extends MongodbRepository<User> {
  constructor(db: Db) {
    super(db.collection('users'))
  }

  public async exists(username: string, email: string) {
    const user = await this.findOneBy({ username, email })

    if (user?.email === email) return 'email'
    if (user?.username === username) return 'username'

    return false
  }

  public findByLogin(login: string): Promise<User | null> {
    return this.findOneBy({ $or: [{ username: login }, { email: login }] })
  }
}
