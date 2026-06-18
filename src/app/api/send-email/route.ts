import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentInquiryAlert from "@/emails/PaymentInquiryAlert";
import PaymentConfirmation from "@/emails/PaymentConfirmation";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "emmanuellangufor@gmail.com";
const FROM = "SURON Bikes <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, paymentMethod, bikes, total, website } = body;

    // Honeypot — real users never fill this field; bots do
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
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

    // Send notification to admin (SUR-RON Payment Inquiry)
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `SUR-RON Payment Inquiry — ${name} — ${paymentMethod} — ${total}`,
      react: PaymentInquiryAlert({ name, email, phone, paymentMethod, bikes, total, message }),
    });

    // Send auto-confirmation to the client (non-blocking failure)
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "SUR-RON — Your Payment Inquiry Received",
        react: PaymentConfirmation({ name, paymentMethod, total }),
      });
    } catch {
      // Confirmation failed — main submission still succeeds
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
