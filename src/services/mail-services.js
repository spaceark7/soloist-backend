import transporter from '../config/mailer.js'
import emailTemplate from '../utils/mail-template/MailTemplate.js'

const sendActivationMail = async (user) => {
  const { email } = user
  transporter.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages')
    }
  })
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Account activation',
    text: '',
    html: emailTemplate(user),
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export default sendActivationMail
