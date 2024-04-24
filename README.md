# Guate Forever Academy

## Local development

1. Install dependencies `npm i`
2. Create a `.env` file in the root of the project that defines the following variables:

```
# Postgres database
DATABASE_URL="..."

# Next Auth secret. In prod, use "openssl rand -base64 32" to generate a random secret
NEXTAUTH_SECRET="secret"

# Google
NEXT_PUBLIC_GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET_KEY="..."

# Resend (Email provider)
AUTH_RESEND_KEY="..."

# Set this to the email that will send the login links.
# This email needs to be registed in Resend, otherwise it won't work
FROM_EMAIL="app@example.com"
```

3. Create migrations `npx prisma migrate dev`
4. Run local server `npm run dev`
