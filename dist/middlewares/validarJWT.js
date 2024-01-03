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
exports.ValidarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const ValidarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición",
        });
        return;
    }
    try {
        const claveSecreta = process.env.SECRETPASSWORD;
        const payload = jsonwebtoken_1.default.verify(token, claveSecreta);
        const { id } = payload;
        const confirmedUser = yield user_1.default.findById(id);
        if (!confirmedUser) {
            res.status(401).json({
                msg: "No hay usuario Logueado",
            });
            return;
        }
        req.body.confirmedUser = confirmedUser;
        req.body.id = id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token inválido",
        });
    }
});
exports.ValidarJWT = ValidarJWT;
