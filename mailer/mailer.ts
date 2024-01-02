import nodemailer from 'nodemailer';

//transporter Nodemailer con cuenta de Gmail

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  from:  "moneynetservice@gmail.com"
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  try {
    const mailOptions = {
      form: '"MoneyNet Services" moneynetservice@gmail.com"',
      to,
      subject: "Código de verificación para tu cuenta en MoneyNet",
      text: `Hola, este es tu código de verificación: ${code}`,
    }
    await transporter.sendMail(mailOptions)
    console.log('Email enviado correctamente')
  } catch (error) {
    console.error('Error al enviar el email')
  }
}