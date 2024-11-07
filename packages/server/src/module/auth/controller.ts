import { IHandler } from "../../types";
import { AuthServices } from "./services";
import { generateTokenPayload } from "./types/generateTokenPayload";

export class AuthController {

    constructor(private readonly service: AuthServices) { }

    generateToken: IHandler = async (req, res) => {
        const body = req.body as generateTokenPayload
        const data = await this.service.generateToken(body);
        return res.json(typeof data === "string" ? { token: data } : { token: null, ...data })
    }

    login: IHandler = async (req, res) => {
        return res.json(await this.service.login(req.body))
    }
}