import Usuario, {IUser} from "../models/user";
import { sendEmail } from "../mailer/mailer";

export const existeEmail =async (email:string): Promise<void> => {
    const existeEmail: IUser | null = await Usuario.findOne({email})

    if(existeEmail && existeEmail.verified){
        throw new Error(`El correo ${email} ya está registrado`);
    }

    if(existeEmail && !existeEmail.verified){
        await sendEmail(email, existeEmail.code as string);
        throw new Error(`El correo ${email} ya está registrado pero no ha sido verificado, se ha enviado un nuevo código de verificación`);
    }
    
}