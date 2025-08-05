import z from 'zod/v3'

export const onboardUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(20, { message: 'Name must be less than 20 characters' }),

  // Book
  bookTitle: z.string().min(1, { message: 'Book title is required' }).max(30, {
    message: 'Book title must be less than 30 characters',
  }),
  bookMood: z.string().min(1, { message: 'Book mood is required' }),
  bookIsPublic: z.boolean().default(false),
})
export type OnboardUserSchema = z.infer<typeof onboardUserSchema>
