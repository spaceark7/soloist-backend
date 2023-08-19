import nodemailer from 'nodemailer'

// Create node mailer singleton
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
})

export default transporter
