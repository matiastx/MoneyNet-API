import express, { Express } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import nodemailer from "nodemailer";
import { transporter } from '../mailer/mailer';

import authRoutes from "../routes/auth"
import ordersRoutes from "../routes/orders"

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  orderPath: string;
  mailerStatus: string; 

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.orderPath = "/orders";
    this.mailerStatus = "Verificando servicio de correos..." as string

    this.dbConnection();

    this.middlewares();

    this.routes()

    this.verifyMailer();

    this.apiHTML();
  }



  async dbConnection(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
  this.app.use(cors());
  this.app.use(express.json());  
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.orderPath, ordersRoutes);
  }

  verifyMailer(): void {
    console.log(this.mailerStatus)
    transporter.verify().then(()=>{
      // console.log('Listo para enviar correos')
      this.mailerStatus = "El servicio de correos esta funcionando correctamente" as string
      console.log(this.mailerStatus)
    }
    ).catch((error)=>{
      // console.error('Error al verificar el transporte', error)
      this.mailerStatus = "Error al iniciar el servicio de correos!" as string
      console.log(this.mailerStatus, error)
    })
  }

  apiHTML(): void {
    this.app.get('/', (req, res) => {
      const htmlContent = `
      <html>
        <head>
          <title>MoneyNet API</title>
        </head>
        <body>
          <h1>La API MoneyNet esta Online!</h1>
          <br/>
          <p>${this.mailerStatus}</p>
          <br/>
          <h3>Para ver la documentacion de la API, ir a la siguiente direccion:</h3>
          <a href="https://documenter.getpostman.com/view/30722200/2s9YsFDtUm" target="_blank">https://documenter.getpostman.com/view/30722200/2s9YsFDtUm</a>
        </body>
      </html>
      `;
      res.send(htmlContent);
    });
  }

  listen(): void {
    this.app.listen(this.port, ()=>{
        console.log(`Servidor corriendo en el puerto ${this.port}`)
    })
  }
}
