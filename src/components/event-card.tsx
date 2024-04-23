"use client"

import { Event } from "@prisma/client"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Card } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

export type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const date = event.date.toLocaleString("default", {
    dateStyle: "short",
    timeStyle: "short",
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex p-4">
          <div className="flex w-12 flex-col items-center justify-center font-semibold leading-none">
            <p className="text-lg">{event.date.getDay()}</p>
            <p className="text-xs uppercase text-muted-foreground">
              {event.date.toLocaleString("default", { month: "long" })}
            </p>
          </div>
          <div className="pl-2 text-left">
            <p className="font-medium tracking-tight">{event.title}</p>
            <span className="text-sm text-muted-foreground">
              <p>{date}</p>
              {event.address && <p>{event.address}</p>}
            </span>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>{date}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {event.address && (
            <div>
              <span className="font-semibold tracking-tight">Address</span>
              <p>{event.address}</p>
            </div>
          )}
          <div>
            <span className="font-semibold tracking-tight">Description</span>
            <p>{event.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
