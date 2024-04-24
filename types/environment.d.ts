declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET_KEY: string
      AUTH_RESEND_KEY: string
      FROM_EMAIL: string
    }
  }
}

export {}
