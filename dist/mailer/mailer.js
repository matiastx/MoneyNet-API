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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//transporter Nodemailer con cuenta de Gmail
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    from: "moneynetservice@gmail.com"
});
const sendEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            form: '"MoneyNet Services" moneynetservice@gmail.com"',
            to,
            subject: "Código de verificación para tu cuenta en MoneyNet",
            text: `Hola, este es tu código de verificación: ${code}`,
        };
        yield transporter.sendMail(mailOptions);
        console.log('Email enviado correctamente');
    }
    catch (error) {
        console.error('Error al enviar el email');
    }
});
exports.sendEmail = sendEmail;
