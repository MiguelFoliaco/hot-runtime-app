import { NextFunction, Request, Response } from "express";
import { client } from "../../../db";

export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.headers.authorization;
    if (jwt === undefined) {
        return res.status(403).json({ msg: 'With out session', error: { code: '403', msg: 'unauthenticated' } })
    }
    const jwtParse = jwt.replace('Bearer ', '')
    const user = await client.auth.getUser(jwtParse)
    await client.auth.setSession({ access_token: jwtParse, refresh_token: '1' })
    if (user.data.user) {
        return next()
    }
    else {
        return res.status(403).json({ msg: 'With out session', error: user.error })
    }
}