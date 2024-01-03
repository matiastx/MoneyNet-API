"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validationsDB_1 = require("../helpers/validationsDB");
const recolectErrors_1 = require("../middlewares/recolectErrors");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
    //validacion custom
    (0, express_validator_1.check)("email").custom(validationsDB_1.existeEmail),
    //middleware custom
    recolectErrors_1.recolectarErrores,
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail().not().isEmpty(),
    (0, express_validator_1.check)("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
    recolectErrors_1.recolectarErrores
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail().not().isEmpty(),
    (0, express_validator_1.check)("code", "El código de verificació es obligatorio").not().isEmpty(),
    recolectErrors_1.recolectarErrores
], auth_1.verfyUser);
exports.default = router;
