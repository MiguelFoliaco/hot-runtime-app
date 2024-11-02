import { NextFunction, Request, Response } from "express";
import { verify } from "../../../utils/verify";
import { generateTokenPayload } from "../types/generateTokenPayload";

export const generateToken = (req: Request, res: Response, next: NextFunction) => {
    const checks = verify<generateTokenPayload>(req.body, {
        user: 'object',
        rol: 'object',
    })

    if (checks.errors.length > 0) {
        return res.json(checks)
    }
    return next()
}