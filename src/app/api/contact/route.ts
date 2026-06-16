import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import NewMessageAlert from "@/emails/NewMessageAlert";
import ContactConfirmation from "@/emails/ContactConfirmation";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "emmanuellangufor@gmail.com";
const FROM = "SURON Bikes <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, website } = body;

    // Honeypot — real users never fill this field; bots do
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Rate limiting by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Send notification to admin (SUR-RON Client Messages)
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `SUR-RON Client Message — ${subject || "(no subject)"} from ${name}`,
      react: NewMessageAlert({ name, email, subject, message }),
    });

    // Send auto-confirmation to the client (non-blocking failure)
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "SUR-RON — We received your message!",
        react: ContactConfirmation({ name }),
      });
    } catch {
      // Confirmation failed — main submission still succeeds
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
