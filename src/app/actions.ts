"using server"

import { config } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function auth() {
  return await getServerSession(config)
}
