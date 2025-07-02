import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, description, budget } = body

    // Aquí integrarías con tu servicio de email (SendGrid, Resend, etc.)
    // Ejemplo con fetch a un servicio de email:

    const emailData = {
      to: "info@gphandysolutions.com",
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
    }

    // Enviar email (implementar según tu proveedor de email)
    // await sendEmail(emailData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending quote:", error)
    return NextResponse.json({ error: "Failed to send quote" }, { status: 500 })
  }
}
