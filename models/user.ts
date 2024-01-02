import { Model, Schema, model } from 'mongoose';
import { ROLES } from '../helpers/constants';

export interface IUser {
    name: string;
    email: string; 
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio desde schema']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio desde schema']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria desde schema']
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...usuario } = this.toObject();
    return usuario
}

const Usuario: Model<IUser> = model<IUser>("Usuario", UserSchema);

export default Usuario