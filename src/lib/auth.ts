import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"
import { sendVerificationRequest } from "./resend"

export const config = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      from: process.env.FROM_EMAIL,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user?.id
        token.isAdmin = (user as any)?.isAdmin
      }

      return token
    },
    session({ session, token, user }) {
      session.user.id = user.id
      session.user.isAdmin = (user as any).isAdmin

      return session
    },
  },
} satisfies NextAuthOptions
