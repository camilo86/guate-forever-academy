import db from "@/lib/db"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

async function handler(req: Request) {
  try {
    const payload = await req.text()
    const sig = req.headers.get("Stripe-Signature")

    if (!sig) {
      throw new Error("Stripe signature missing")
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY
    )

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items"] }
      )

      await fullfillOrder(sessionWithLineItems)
    } else if (event.type === "customer.subscription.deleted") {
      const subscriptionId = event.data.object.id
      await cancelSubscription(subscriptionId)
    }
  } catch (e) {
    console.error(e)

    return new Response("Failed to parse or validate webhook", {
      status: 400,
    })
  }

  return new Response(null, {
    status: 200,
  })
}

async function fullfillOrder(
  stripeCheckoutSession: Stripe.Response<Stripe.Checkout.Session>
) {
  const inviteId = stripeCheckoutSession.client_reference_id

  if (!inviteId) {
    throw new Error(
      "New subscription does not have a an invite id (client_reference_id)"
    )
  }

  const invite = await db.invite.findUnique({
    where: {
      id: inviteId,
    },
  })

  if (!invite) {
    throw new Error("Invite not found")
  }

  await db.player.update({
    where: {
      id: invite.playerId,
    },
    data: {
      clubId: invite.clubId,
      subscriptionId: stripeCheckoutSession.subscription as string,
    },
  })

  await db.invite.update({
    where: {
      id: invite.id,
    },
    data: {
      status: "accepted",
    },
  })
}

async function cancelSubscription(subscriptionId: string) {
  if (!subscriptionId) {
    throw new Error("Subscription ID missing when cancelling subscription")
  }

  const player = await db.player.findFirst({
    where: {
      subscriptionId,
    },
  })

  if (!player) {
    throw new Error("Player not found when cancelling subscription")
  }

  await db.player.update({
    where: {
      id: player.id,
    },
    data: {
      subscriptionId: null,
      clubId: null,
    },
  })
}

export { handler as POST }
