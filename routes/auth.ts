import { Router } from "express";
import { login, register, verfyUser } from "../controllers/auth";
import { check } from "express-validator";
import { existeEmail } from "../helpers/validationsDB";

import { recolectarErrores } from "../middlewares/recolectErrors";
import { verify } from "jsonwebtoken";

const router = Router();

router.post('/register',[
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
  check("password", "El password debe ser de 6 caracteres").isLength({min: 6}),
  //validacion custom
  check("email").custom(existeEmail),
  //middleware custom
  recolectarErrores,
] ,register)

router.post("/login",[
  check("email", "El email es obligatorio").isEmail().not().isEmpty(),
  check("password", "El password debe ser de 6 caracteres").isLength({min: 6}),
  recolectarErrores
] ,login)

router.patch("/verify",[
  check("email", "El email es obligatorio").isEmail().not().isEmpty(),
  check("code", "El código de verificació es obligatorio").not().isEmpty(),
  recolectarErrores
] ,verfyUser)

export default router;