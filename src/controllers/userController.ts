import {     Request, Response, NextFunction     } from 'express';

export const User = async (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).json({ message: '✅ Usuario Pronto.' });

};