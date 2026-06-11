import { type Static, String, Type } from 'typebox'

export const LoginSchema = Type.Object({
  name: String({ minLength: 3, maxLength: 255 }),
})

export interface Login extends Static<typeof LoginSchema> { }

export interface Auth {
  id: string;
  name: string;
}