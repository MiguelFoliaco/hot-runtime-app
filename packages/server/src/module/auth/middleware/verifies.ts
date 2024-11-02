import { NextFunction, Request, Response } from "express"
import { verify } from "../../../utils/verify"
import { Tables } from "../../../database.types"

export const verifyGenerateVersion = (req: Request, res: Response, next: NextFunction) => {
    const errors = verify<Tables<'version-code'>>(req.body, {
        available_production: 'boolean',
        available_test: 'boolean',
        os_id: 'number',
        projectid: 'number',
        publicateBy: 'string'
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
