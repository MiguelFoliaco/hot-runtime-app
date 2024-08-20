import { io } from "socket.io-client";

export const socket = io("ws://localhost:3001", {
    reconnectionDelayMax: 10000,
    // auth: {
    //     token: "123"
    // },
    // query: {
    //     "my-key": "my-value"
    // }
});