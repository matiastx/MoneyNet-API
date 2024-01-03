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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const auth_1 = __importDefault(require("../routes/auth"));
const orders_1 = __importDefault(require("../routes/orders"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.authPath = "/auth";
        this.orderPath = "/orders";
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.apiHTML();
    }
    apiHTML() {
        this.app.get('/', (req, res) => {
            const htmlContent = `
      <html>
        <head>
          <title>MoneyNet API</title>
        </head>
        <body>
          <h1>La API MoneyNet esta Online!</h1>
          <p>Para ver la documentacion de la API, ir a la siguiente direccion:</p>
          <a href="https://documenter.getpostman.com/view/30722200/2s9YsFDtUm">https://documenter.getpostman.com/view/30722200/2s9YsFDtUm</a>
        </body>
      </html>
      `;
            res.send(htmlContent);
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.orderPath, orders_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
