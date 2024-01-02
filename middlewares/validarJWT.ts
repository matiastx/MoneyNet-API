import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/user";

export const ValidarJWT =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("x-token") as string;

  if (!token) {
    res.status(401).json({
      msg: "No hay token en la petición",
    });
    return;
  }

  try {
    const claveSecreta = process.env.SECRETPASSWORD as string;
    const payload = jwt.verify(token, claveSecreta) as JwtPayload;

    const {id} = payload;
    const confirmedUser: IUser| null = await Usuario.findById(id);

    if (!confirmedUser) {
      res.status(401).json({
        msg: "No hay usuario Logueado",
      });
      return;
    }

  req.body.confirmedUser = confirmedUser;
  req.body.id = id;

  next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token inválido",
    });
  }
}
