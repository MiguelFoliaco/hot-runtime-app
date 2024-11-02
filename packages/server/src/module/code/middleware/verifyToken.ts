import { NextFunction, Request, Response } from "express";
import { client } from "../../../db";
import { decode, JsonWebTokenError, verify } from "jsonwebtoken";
import { env } from "../../../utils";

export type payloadTokenDev = {
    actions: string[];
    userId: string;
    tokenID: number;
    iat: number;
    exp: number;
}
export const verifyTokenDevelop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.headers['x-authentication-code'] as string;

        if (!jwt) return res.status(403).json({ msg: 'Not provider Token', error: true })
        const token = jwt.replace('Bearer ', '');

        verify(token, env('JWT_KEY_CLIENT_generate') || '')
        const payload = decode(token, {
            json: true,
        }) as payloadTokenDev

        const token_dev = await client.from('tokens_dev').select('create_by').eq('id', payload.tokenID)
        if (!token_dev.data || !token_dev.data[0]) {
            return res.status(403).json({ msg: 'Token invalido', error: true })
        }
        const tokenSelected = token_dev.data[0];
        if (payload.userId !== tokenSelected.create_by) {
            return res.status(403).json({ msg: 'El dueño del token no corresponde con el usuario que realiza la petición', error: true })
        }
        //@ts-ignore
        req.session.tokenPayload = payload
        return next()
    }
    catch (err) {
        const error = err as JsonWebTokenError
        return res.json(error)
    }
}