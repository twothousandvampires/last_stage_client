import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Client from "./src/Client.js";
const socket = io.connect('http://localhost:9001');
socket.on('connect', () => {
    new Client(socket);
});
socket.on('disconnect', () => {
    location.reload();
});
socket.on('game_is_over', () => {
    location.reload();
});
