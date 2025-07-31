import z from 'zod'

export const createEntrySchema = z.object({
  content: z.string().min(100, { message: 'Content must be at least 100 characters' }),
})
export type CreateEntrySchema = z.infer<typeof createEntrySchema>
