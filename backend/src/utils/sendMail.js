import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), 
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP Error:", err);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});

console.log("SMTP_USER:", process.env.SMTP_EMAIL);
console.log("SMTP_PASS:", process.env.SMTP_PASSWORD ? "✓ Present" : "❌ Missing");

export const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"My App Name" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is: ${otp}</h3>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", to);
  } catch (error) {
    console.error("Failed to send OTP:", error); // LOG THIS
    throw new Error("Error sending OTP");
  }
};