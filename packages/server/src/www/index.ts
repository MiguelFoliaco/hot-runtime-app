import express from 'express'
import cors from 'cors'
import ngrok from '@ngrok/ngrok'
import { routes } from '../module'
import { Server } from 'socket.io'
import { createServer } from 'http'
import session from 'express-session'
import { env } from '../utils'


export class WWW {

    private app = express()
    private httpServer = createServer(this.app)
    private io = new Server(this.httpServer, {
        cors: {
            origin: '*'
        }
    })
    constructor() {
        if (this.app.get('env') === 'production') {
            this.app.set('trust proxy', 1)
        }
        this.app.use(session({
            secret: env('SESSION_KEY') || 'secret.key',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
            }
        }))
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.routes()
        this.events()
    }

    private routes() {
        this.app.all('/*', (req, res, next) => {
            console.log(req.originalUrl)
            next()
        })
        this.app.use('/api', routes)
    }


    private events() {
        this.io.on('connection', (socket) => {
            this.app.set('IO', socket)
            console.log('Socket connect', socket.id)
        })
    }
    listen(port?: string | number, enablengrok?: boolean) {
        this.app.listen(port, () => {
            console.log('Server in port %s', port)
        })
        this.httpServer.listen(3001, () => {
            console.log('Server Socket in port %s', 3001)
        })

        if (enablengrok) {
            ngrok.connect({ addr: 3000, authtoken_from_env: true, domain: 'oarfish-great-flea.ngrok-free.app', port: 80 })
                .then(listener => {
                    console.log(`Ingress established at: ${listener.url()}`)
                })
        }

    }
}