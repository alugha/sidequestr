import { Type } from 'typebox'

export const DateTimeSchema = Type.String({ format: 'date-time' })

export const IdSchema = Type.String({ format: 'uuid' })