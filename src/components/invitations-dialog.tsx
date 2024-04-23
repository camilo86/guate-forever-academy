"use client"

import { rejectInvite } from "@/app/actions"
import { Club, Invite, Player } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import { FaTicketAlt } from "react-icons/fa"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export type InviteWithPlayerAndClub = Invite & {
  player: Player
  club: Club
}

export type InvitationsDialogProps = {
  invites: InviteWithPlayerAndClub[]
}

export function InvitationsDialog({ invites }: InvitationsDialogProps) {
  const router = useRouter()
  const { data } = useSession()
  const [open, setOpen] = React.useState(false)

  const handleAcceptInvite = (invite: InviteWithPlayerAndClub) => async () => {
    setOpen(false)

    // Adds the invite ID to the payment link
    const paymentLink = new URL(invite.club.stripePaymentLink)
    paymentLink.searchParams.set("client_reference_id", invite.id)

    // Prefills the email if available
    if (data?.user?.email) {
      paymentLink.searchParams.set("prefilled_email", data.user.email)
    }

    router.push(paymentLink.toString())
  }

  const handleRejectInvite = (invite: InviteWithPlayerAndClub) => async () => {
    setOpen(false)
    await rejectInvite(invite.id)
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Alert className="mb-6">
          <FaTicketAlt />
          <AlertTitle>You have an invitation!</AlertTitle>
          <AlertDescription>
            One or more players have been invited to join a club! Check the
            invite and respond at your earliest convenience.
            <Button className="mt-4 block w-full md:w-auto">
              View Invitations
            </Button>
          </AlertDescription>
        </Alert>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invitations</DialogTitle>
          <DialogDescription>
            One or more players have been invited to join a club! Check the
            invite and respond at your earliest convenience.
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible>
          {invites.map((invite) => (
            <AccordionItem value={invite.id}>
              <AccordionTrigger>
                {invite.player.name} is Invitied
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-lg font-semibold tracking-tight">
                  {invite.title}
                </p>
                <p>{invite.description}</p>
                <div className="mt-8 flex gap-2">
                  <Button
                    className="flex-grow"
                    onClick={handleAcceptInvite(invite)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="flex-grow"
                    variant="outline"
                    onClick={handleRejectInvite(invite)}
                  >
                    Reject
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}
