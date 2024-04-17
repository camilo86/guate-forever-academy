import { Navbar } from "@/components/navbar"
import { redirect } from "next/navigation"
import React from "react"
import { auth } from "../actions"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  )
}
