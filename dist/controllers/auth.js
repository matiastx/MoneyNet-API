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
exports.verfyUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generarJWT_1 = require("../helpers/generarJWT");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, rol } = req.body;
    const User = new user_1.default({ name, email, password, rol });
    // Encriptar contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    User.password = bcryptjs_1.default.hashSync(password, salt);
    // Revisar si el usuario es admin
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.ADMIN_KEY) {
        User.rol = constants_1.ROLES.admin;
    }
    // Generar código de verificación
    const newCode = randomstring_1.default.generate(6);
    User.code = newCode;
    yield User.save();
    yield (0, mailer_1.sendEmail)(email, newCode);
    res.status(201).json({ User });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: "El usuario ingresado incorrecto"
            });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                msg: "La contraseña no es correcta"
            });
            return;
        }
        const token = yield (0, generarJWT_1.generateJWT)(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al iniciar sesión"
        });
    }
});
exports.login = login;
const verfyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: "El usuario ingresado incorrecto"
            });
            return;
        }
        if (user.verified) {
            res.status(400).json({
                msg: "El usuario ya se encuentra verificado"
            });
            return;
        }
        if (user.code !== code) {
            res.status(401).json({
                msg: "El código de verificación es incorrecto"
            });
            return;
        }
        const UpdateUerVerify = yield user_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({
            msg: "Usuario verificado correctamente"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al iniciar sesión"
        });
    }
});
exports.verfyUser = verfyUser;
