import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const applyFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

export const applyFormResolver = zodResolver(applyFormSchema)
export type ApplyFormType = z.infer<typeof applyFormSchema>
