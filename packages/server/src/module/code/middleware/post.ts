import { NextFunction, Request, Response } from "express";
import { verify } from "../../../utils/verify";

export const verifyCompile = (req: Request, res: Response, next: NextFunction) => {
    const errors = verify<{ jsx: string }>(req.body, {
        jsx: 'string'
    });
    if (errors.errors.length > 0) {
        return res.json({
            data: null,
            error: {
                message: errors.message
            },
            errors
        })
    }
    return next()
}

export const verifyPushComponents = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body?.components
    if (body instanceof Array && req.body.projectId) {
        return next()
    }
    return res.json({
        data: null,
        error: {
            message: "Payload type invalid"
        },
    })
}