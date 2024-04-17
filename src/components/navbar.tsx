"use client"

import Link from "next/link"
import { FaBars, FaCaretRight, FaSignOutAlt } from "react-icons/fa"

import { getNameInitials } from "@/lib/strings"
import { useSession } from "next-auth/react"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { UserNav } from "./user-nav"

export function Navbar() {
  const { data } = useSession()

  const [isOpen, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <div className="h-14 w-full border-b">
        {/* Desktop view */}
        <div className="container hidden h-full items-center gap-6 md:flex">
          <span className="text-lg font-bold tracking-tight">
            Guate Forever Academy
          </span>
          <Link href="#">Dashboard</Link>
          <Link href="#">Players</Link>
          <div className="mx-auto" />
          <UserNav />
        </div>

        {/* Mobile view */}
        <div className="container flex h-full items-center md:hidden">
          <span className="text-lg font-bold tracking-tight">
            Guate Forever Academy
          </span>
          <div className="mx-auto" />

          <Button variant="outline" onClick={() => setOpen(!isOpen)}>
            <FaBars />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="grid w-full divide-y rounded-b-md border-b text-muted-foreground md:hidden">
          <div className="flex flex-col items-center p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={data?.user?.image || ""}
                alt={data?.user?.email || ""}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {getNameInitials(data?.user?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2 font-semibold">{data?.user?.name}</span>
          </div>
          <Link href="#" className="flex items-center justify-between p-2">
            Dashboard
            <FaCaretRight />
          </Link>
          <Link href="#" className="flex items-center justify-between p-2">
            Players
            <FaCaretRight />
          </Link>
          <Link href="#" className="flex items-center justify-between p-2">
            My Account
            <FaCaretRight />
          </Link>
          <Link href="#" className="flex items-center justify-center p-2">
            Logout <FaSignOutAlt className="ml-2 text-muted-foreground" />
          </Link>
        </div>
      )}
    </React.Fragment>
  )
}
