"use server"

import { createClubFormSchema } from "@/../types/guate"
import { auth } from "@/app/actions"
import db from "@/lib/db"
import { stripe } from "@/lib/stripe"
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

  const product = await stripe.products.create({
    name: model.name,
    default_price_data: {
      currency: "usd",
      recurring: { interval: "month" },
      unit_amount: Math.round(model.price * 100),
    },
  })

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  })

  await db.club.create({
    data: {
      name: model.name,
      stripePaymentLink: paymentLink.url,
    },
  })
}
