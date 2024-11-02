import { io } from "socket.io-client";
import { config } from "../configs/constants";

export const socket = io(`ws://${config.socket}`, {
    reconnectionDelayMax: 10000,
    autoConnect: true
    // auth: {
    //     token: "123"
    // },
    // query: {
    //     "my-key": "my-value"
    // }
});