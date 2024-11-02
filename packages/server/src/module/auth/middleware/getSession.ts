import { Request } from "express";

export const getSession = (req: Request | string) => {
    const jwt = typeof req === 'string' ? req : req.headers.authorization as string;
    return jwt.replace('Bearer ', '')
}