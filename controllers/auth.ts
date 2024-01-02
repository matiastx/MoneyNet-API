import { Request, Response } from "express";
import Usuario, {IUser} from "../models/user";
import bcrypt from "bcryptjs";
import { ROLES } from "../helpers/constants";
import Randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generarJWT";

export const register =async (req:Request, res: Response): Promise<void> => {
  const {name, email,password, rol}: IUser = req.body;

  const User = new Usuario({name, email, password, rol})

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();

  User.password = bcrypt.hashSync(password, salt);

  // Revisar si el usuario es admin
  const adminKey = req.headers["admin-key"]

  if (adminKey === process.env.ADMIN_KEY) {
    User.rol = ROLES.admin
  }

  // Generar código de verificación
  const newCode = Randomstring.generate(6);

  User.code = newCode;

  await User.save();

  await sendEmail(email, newCode);

  res.status(201).json({ User });
};

export const login = async (req:Request, res: Response): Promise<void> => {
  const { email, password }:IUser = req.body;

  try {
    const user = await Usuario.findOne({email})

    if(!user){
      res.status(400).json({
        msg: "El usuario ingresado incorrecto"
      })
      return
    }
    
    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword){
      res.status(400).json({
        msg: "La contraseña no es correcta"
      })
      return
    }

    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error al iniciar sesión"
    })
  }
}

export const verfyUser = async (req:Request, res: Response): Promise<void> => {
  const { email, code }:IUser = req.body;

  try {
    const user = await Usuario.findOne({email})

    if(!user){
      res.status(400).json({
        msg: "El usuario ingresado incorrecto"
      })
      return
    }

    if (user.verified) {
      res.status(400).json({
        msg: "El usuario ya se encuentra verificado"
      })
      return
    }

    if (user.code !== code) {
      res.status(401).json({
        msg: "El código de verificación es incorrecto"
      })
      return
    }

    const UpdateUerVerify = await Usuario.findOneAndUpdate({email}, {verified: true})
    res.status(200).json({
      msg: "Usuario verificado correctamente"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error al iniciar sesión"
    })
  }

}