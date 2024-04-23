"use server"

import { createClubFormSchema } from "@/../types/guate"
import { auth } from "@/app/actions"
import db from "@/lib/db"
import { z } from "zod"

export async function createClub(model: z.infer<typeof createClubFormSchema>) {
  const session = await auth()
  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized")
  }

  const { success } = createClubFormSchema.safeParse(model)
  if (!success) {
    throw new Error("Invalid club data")
  }

  await db.club.create({
    data: {
      name: model.name,
      stripePaymentLink: model.stripePaymentLink,
    },
  })
}
