import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaGoogle } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
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
            <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2" /> Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
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
      <div className="hidden bg-muted lg:block">
        <Image
          src="/soccer-game.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover brightness-[0.5] grayscale-[50%]"
        />
      </div>
    </div>
  )
}
