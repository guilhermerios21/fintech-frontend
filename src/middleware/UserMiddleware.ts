import { IUser, User } from '../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { sign, Secret, JwtPayload } from 'jsonwebtoken';

// --- Checagem das Credenciais ---
const checkCredentials = (userCredentials?: any): any => {
    const { email, role } = userCredentials || {};

    if (!userCredentials || typeof userCredentials !== 'object' || !email) {
        return false;
    }

    return userCredentials;
};

export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.user!;
        const checkedCredentials = checkCredentials(userData);

        if (!checkedCredentials) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        const existingUser = await User.findOne({ email: checkedCredentials.email });

        if (!existingUser) {
            const newUser = new User({ 
                email: checkedCredentials.email, 
                role: checkedCredentials.role, 
            });

            await newUser.save();
        }

        req.body = checkedCredentials;
        next();
    } catch (error) {
        next(error);
    }
};

