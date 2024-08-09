import express from 'express'
import cors from 'cors'
import { routes } from '../module'
export class WWW {

    private app = express()

    constructor() {
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.routes()
    }

    private routes() {
        this.app.use(routes)
    }

    listen(port?: string | number) {
        this.app.listen(port, () => {
            console.log('Server in port %s', port)
        })
    }
}