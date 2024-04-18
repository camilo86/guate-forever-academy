"use client"

import { respondToInvite } from "@/app/actions"
import { Club, Invite, Player } from "@prisma/client"
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
  const [open, setOpen] = React.useState(false)

  const handleInviteResponse =
    (inviteId: string, response: "accepted" | "rejected") => async () => {
      setOpen(false)
      await respondToInvite(inviteId, response)
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
                    onClick={handleInviteResponse(invite.id, "accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    className="flex-grow"
                    variant="outline"
                    onClick={handleInviteResponse(invite.id, "rejected")}
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
