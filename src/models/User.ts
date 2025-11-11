import { Schema, model, Document } from "mongoose"
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email:    string;
  role?:    string;
}

const userSchema = new Schema<IUser>(
  {
    role:     { 
      type: String, 
      required: [true, "Cargo é obrigatório" ], 
      trim: true,                                
    },
    email:    { 
      type: String, required: [true, "Email é obrigatório"], 
      trim: true, 
      unique: true, 
      lowercase: true, 
      match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
    },

  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);