import { ObjectId } from 'bson'

export type Serialized<T extends { id: string }> = Omit<T, 'id'> & {
  _id: ObjectId
}
