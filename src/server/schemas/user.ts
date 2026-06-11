import { type Static, String, Type } from 'typebox'

export const UserSchema = Type.Object({
  name: String({ minLength: 1, maxLength: 255 }),
})

export interface User extends Static<typeof UserSchema> { }
