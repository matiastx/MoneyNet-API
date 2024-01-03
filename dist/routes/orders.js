"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validarJWT_1 = require("../middlewares/validarJWT");
const recolectErrors_1 = require("../middlewares/recolectErrors");
const validarUser_1 = require("../middlewares/validarUser");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [
    validarJWT_1.ValidarJWT,
    recolectErrors_1.recolectarErrores
], orders_1.getOrders);
router.post('/', [
    validarJWT_1.ValidarJWT,
    validarUser_1.ValidarUser,
    (0, express_validator_1.check)('user', 'Ingresar el usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('total', 'El total de la orden es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('items', 'No puede generarse la orden sin agregar al menos 1 Item').not().isEmpty(),
    recolectErrors_1.recolectarErrores
], orders_1.createOrder);
exports.default = router;
