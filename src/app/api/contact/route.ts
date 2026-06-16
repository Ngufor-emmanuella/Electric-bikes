import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "randersonsdanicamaliha@gmail.com";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #fff; margin: 0;">SURON</h1>
        <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 6px 0 0;">Electric Bikes — Contact Form Submission</p>
      </div>

      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 16px;">Sender Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["Name", name],
            ["Email", email],
            ["Subject", subject || "No subject provided"],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 11px; color: rgba(255,255,255,0.4); padding: 6px 0; width: 110px; vertical-align: top;">${label}</td>
              <td style="font-family: Arial, sans-serif; font-size: 13px; color: #fff; padding: 6px 0;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>

      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 12px;">Message</h2>
        <p style="font-family: Arial, sans-serif; font-size: 13px; color: rgba(255,255,255,0.75); margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
      </div>

      <p style="font-family: Arial, sans-serif; font-size: 11px; color: rgba(255,255,255,0.25); text-align: center; margin: 24px 0 0;">
        Reply directly to: <a href="mailto:${email}" style="color: rgba(255,255,255,0.6);">${email}</a>
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"SURON Bikes" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `Contact: ${subject || "(no subject)"} — from ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
