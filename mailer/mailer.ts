import nodemailer from "nodemailer";

//transporter Nodemailer con cuenta de Gmail

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "moneynetservice@gmail.com",
      pass: "qrosgqysfakaxznk"
  },
  //Configuración de seguridad para evitar errores con Gmail
  tls: {
      rejectUnauthorized: false
  },
  from:  "moneynetservice@gmail.com"
})

// Verificacion del transporter para enviar correos
export let verifyTransporter:string = ""


transporter.verify().then(()=>{
  console.log('Listo para enviar correos')
  verifyTransporter = "El servicio de correos esta funcionando correctamente"
}
).catch((error)=>{
  console.error('Error al verificar el transporte', error)
  verifyTransporter = "Error al iniciar el servicio de correos!"
})

export const sendEmail =async (to:string, code: string): Promise<void> => {
  try{
      //Configura los detalles del correo electronico
      const mailOptions = {
          form: '"MoneyNet" moneynetservice@gmail.com"',
          to,
          subject: "Código de verificación MoneyNet",
          text: `
          Hola!, este es tu codigo de verificacion para tu cuenta de MoneyNet: ${code}
          `
      }

      //Envía el correo electrónico
      await transporter.sendMail(mailOptions);
      console.log('Correo electronico enviado correctamente')
  }catch(error){
      console.error('Error al enviar el correo electrónico')
  }
}