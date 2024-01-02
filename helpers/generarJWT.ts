import jwt from 'jsonwebtoken';

export const generateJWT = (id: string = ''): Promise<string> => {
  return new Promise((res, rej) => {
    const payload = { id };

    jwt.sign(
      payload, 
      process.env.SECRETPASSWORD as string,
      { expiresIn: '4h' },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.log(err);
          rej('No se pudo generar el Token');
        } else {
          res(token as string);
        }
      }
    )
  })
}