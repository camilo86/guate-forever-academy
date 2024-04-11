import Image from "next/image"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <LoginForm />
      <div className="hidden bg-muted lg:block">
        <Image
          src="/soccer-game.jpg"
          alt="Soccer game in progress"
          width="1920"
          height="1080"
          className="h-full w-full object-cover brightness-[0.5] grayscale-[50%]"
        />
      </div>
    </div>
  )
}
