import { type Static, String, Type } from 'typebox'
import { IdSchema } from './common.ts'

export const QuestStepSchema = Type.Object({
    id: String({ minLength: 3, maxLength: 32 }),
    displayName: String({ minLength: 3, maxLength: 255 }),
    required: Type.Array(IdSchema),
    completed: Type.Boolean(),
})

export const QuestSchema = Type.Object({
    id: String({ minLength: 3, maxLength: 32 }),
    displayName: String({ minLength: 3, maxLength: 255 }),
    description: String({ minLength: 3, maxLength: 1024 }),
    tasks: Type.Array(QuestStepSchema),
})

export interface Quest extends Static<typeof QuestSchema> { }
export interface QuestStep extends Static<typeof QuestStepSchema> { }
