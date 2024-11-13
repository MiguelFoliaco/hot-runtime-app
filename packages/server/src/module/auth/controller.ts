import { IHandler } from "../../types";
import { Get } from "../../utils/decorators";
import { AuthServices } from "./services";
import { generateTokenPayload } from "./types/generateTokenPayload";
import { Response, Request } from 'express';

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

    @Get("GET /get-user")
    async getUsers(req: Request, res: Response) {
        console.log(AuthController.bind(this))
        //@ts-ignore
        this = AuthController
        return res.json({})
    }
}