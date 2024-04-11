"use client"

import Link from "next/link"
import { FaFacebook, FaGoogle } from "react-icons/fa"

import { signIn, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

export function LoginForm() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              You are already signed in.
            </p>
          </div>
          <Link href="/dashboard" legacyBehavior>
            <Button>Go to dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <Separator />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("facebook")}
          >
            <FaFacebook className="mr-2" /> Continue with Facebook
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
