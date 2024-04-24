import { SendVerificationRequestParams } from "next-auth/providers/email"
import { Resend } from "resend"

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const {
    identifier: email,
    url,
    provider: { from },
  } = params

  try {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)
    await resend.emails.send({
      from,
      to: email,
      subject: "Guate Forever Academy - Log in to your account",
      html: `<p>Click <a href="${url}">here</a> to log in to your account.</p>`,
    })
  } catch (e) {
    console.error(e)
  }
}
