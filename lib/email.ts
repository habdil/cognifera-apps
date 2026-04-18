import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM;
const contactNotifyEmail = process.env.CONTACT_NOTIFY_EMAIL;

export function isEmailNotificationConfigured() {
  return Boolean(
    smtpHost &&
      smtpPort &&
      smtpUser &&
      smtpPass &&
      smtpFrom &&
      contactNotifyEmail
  );
}

function getTransporter() {
  if (!isEmailNotificationConfigured()) {
    throw new Error("SMTP is not fully configured");
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

type ContactEmailPayload = {
  name: string;
  email: string;
  layananInterest: string | null;
  message: string;
};

export async function sendContactNotificationEmail(payload: ContactEmailPayload) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: smtpFrom,
    to: contactNotifyEmail,
    replyTo: payload.email,
    subject: `Lead Baru Contact Form - ${payload.name}`,
    text: [
      "Lead baru dari landing page Cognifera.",
      "",
      `Nama: ${payload.name}`,
      `Email: ${payload.email}`,
      `Layanan: ${payload.layananInterest || "-"}`,
      "",
      "Pesan:",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 16px;">Lead baru dari landing page Cognifera</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 700; width: 140px;">Nama</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Layanan</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.layananInterest || "-")}</td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <div style="font-weight: 700; margin-bottom: 8px;">Pesan</div>
          <div style="padding: 12px; background: #f3f4f6; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
        </div>
      </div>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
