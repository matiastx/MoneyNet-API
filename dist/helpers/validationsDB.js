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
exports.existeEmail = void 0;
const user_1 = __importDefault(require("../models/user"));
const mailer_1 = require("../mailer/mailer");
const existeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield user_1.default.findOne({ email });
    if (existeEmail && existeEmail.verified) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
    if (existeEmail && !existeEmail.verified) {
        yield (0, mailer_1.sendEmail)(email, existeEmail.code);
        throw new Error(`El correo ${email} ya está registrado pero no ha sido verificado, se ha enviado un nuevo código de verificación`);
    }
});
exports.existeEmail = existeEmail;
