import { NextFunction, Request, Response } from "express";

export const ValidarUser = (req: Request, res: Response, next: NextFunction): void => {
  const {verified} = req.body.confirmedUser;

  if (!verified) {
    res.status(401).json({
      msg: "Usuario aún no se encuentra verificado",
    });
    return;
  }

  next();
}