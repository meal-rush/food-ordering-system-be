import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Here you would typically verify the token (e.g., using JWT)
    // For demonstration, let's assume the token is valid if it equals 'valid-token'
    if (token !== 'valid-token') {
        return res.status(403).json({ message: 'Invalid token' });
    }

    // If the token is valid, proceed to the next middleware or route handler
    next();
};