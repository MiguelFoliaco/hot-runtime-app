"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WWW = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ngrok_1 = __importDefault(require("@ngrok/ngrok"));
const module_1 = require("../module");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const express_session_1 = __importDefault(require("express-session"));
const utils_1 = require("../utils");
class WWW {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: '*'
            }
        });
        if (this.app.get('env') === 'production') {
            this.app.set('trust proxy', 1);
        }
        this.app.use((0, express_session_1.default)({
            secret: (0, utils_1.env)('SESSION_KEY') || 'secret.key',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
            }
        }));
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.routes();
        this.events();
    }
    routes() {
        this.app.all('/*', (req, res, next) => {
            console.log(req.originalUrl);
            next();
        });
        this.app.use('/api', module_1.routes);
    }
    events() {
        this.io.on('connection', (socket) => {
            this.app.set('IO', socket);
            console.log('Socket connect', socket.id);
        });
    }
    listen(port, enablengrok) {
        this.app.listen(port, () => {
            console.log('Server in port %s', port);
        });
        this.httpServer.listen(3001, () => {
            console.log('Server Socket in port %s', 3001);
        });
        if (enablengrok) {
            ngrok_1.default.connect({ addr: 3000, authtoken_from_env: true, domain: 'oarfish-great-flea.ngrok-free.app', port: 80 })
                .then(listener => {
                console.log(`Ingress established at: ${listener.url()}`);
            });
        }
    }
}
exports.WWW = WWW;
