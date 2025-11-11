import { Request, Response, NextFunction } from 'express';
import financeService from '../services/FinanceServices';

/* Controller mantém os nomes exportados esperados pelas rotas atuais (CreateTask, GetTasksByUserId...) 
     mas implementa lógica para financiamentos. */

export const CreateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        if (!userId) return res.status(400).json({ message: 'ID do usuário é obrigatório.' });

        const payload = req.body;
        const result = await financeService.createFinance(userId, { ...payload });
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const GetTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        if (!userId) return res.status(400).json({ message: 'ID do usuário é obrigatório.' });

        const filters = req.query;
        const result = await financeService.getFinancesByUserId(userId, filters);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const GetTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const financeId = req.params.id;
        const userId = req.user!.id;
        if (!userId || !financeId) return res.status(400).json({ message: 'ID do usuário e ID do financiamento são obrigatórios.' });

        const result = await financeService.getFinancesById(financeId, userId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const FullUpdateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const financeId = req.params.id;
        const userId = req.user!.id;
        if (!userId || !financeId) return res.status(400).json({ message: 'ID do usuário e ID do financiamento são obrigatórios.' });

        const updateData = req.body;
        if (updateData.userId && updateData.userId !== userId) {
            return res.status(403).json({ message: 'Não é permitido alterar o ID do usuário do financiamento.' });
        }

        const result = await financeService.updateFinance(financeId, userId, updateData);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const PartialUpdateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const financeId = req.params.id;
        const userId = req.user!.id;
        if (!userId || !financeId) return res.status(400).json({ message: 'ID do usuário e ID do financiamento são obrigatórios.' });

        const updateData = req.body;
        const result = await financeService.updateFinance(financeId, userId, updateData);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const DeleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const financeId = req.params.id;
        const userId = req.user!.id;
        if (!userId || !financeId) return res.status(400).json({ message: 'ID do usuário e ID do financiamento são obrigatórios.' });

        const result = await financeService.deleteFinance(financeId, userId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const restoreTask = async (req: Request, res: Response, next: NextFunction) => {
    // Restauração de exclusão não implementada: usar soft-delete na model se necessário.
    return res.status(501).json({ message: 'Restauração de financiamento não implementada.' });
};
