"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//transporter Nodemailer con cuenta de Gmail
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "moneynetservice@gmail.com",
        pass: "qrosgqysfakaxznk"
    },
    //Configuración de seguridad para evitar errores con Gmail
    tls: {
        rejectUnauthorized: false
    },
    from: "moneynetservice@gmail.com"
});
const sendEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Configura los detalles del correo electronico
        const mailOptions = {
            form: '"MoneyNet" moneynetservice@gmail.com"',
            to,
            subject: "Código de verificación MoneyNet",
            text: `
          Hola!, este es tu codigo de verificacion para tu cuenta de MoneyNet: ${code}
          `
        };
        //Envía el correo electrónico
        yield exports.transporter.sendMail(mailOptions);
        console.log('Correo electronico enviado correctamente');
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico');
    }
});
exports.sendEmail = sendEmail;
