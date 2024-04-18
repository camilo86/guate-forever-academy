import { z } from "zod"

export const createPlayerFormSchema = z.object({
  name: z.string().min(1),
  birthday: z
    .instanceof(Date, { message: "Birthday is required" })
    .refine((date) => {
      return date < new Date(Date.now())
    }, "The date must be in the past"),
})

export const createClubFormSchema = z.object({
  name: z.string().min(1),
})
