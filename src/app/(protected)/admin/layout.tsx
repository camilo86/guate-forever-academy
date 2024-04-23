import { auth } from "@/app/actions"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  if (!session.user.isAdmin) {
    redirect("/dashboard")
  }

  return (
    <React.Fragment>
      <div className="flex border-b">
        <div className="container flex h-8 items-center gap-4 text-muted-foreground">
          <div>
            <Badge variant="outline">Admin</Badge>
          </div>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/players">Players</Link>
          <Link href="/admin/clubs">Clubs</Link>
          <Link href="/admin/invites">Invites</Link>
          <Link href="/admin/events">Events</Link>
        </div>
      </div>
      {children}
    </React.Fragment>
  )
}
