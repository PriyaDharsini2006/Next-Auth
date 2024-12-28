// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Verify your email address</h1>
        <p>Click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  });
}