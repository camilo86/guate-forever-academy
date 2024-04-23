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
  price: z.coerce.number().min(0),
})

export const createClubInviteFormSchema = z.object({
  playerId: z.string().min(1),
  clubId: z.string().min(1),
})

export const createEventFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.instanceof(Date),
  address: z.string().optional(),
})
