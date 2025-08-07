import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"
import Client from "./scripts/Client"
import url from "../config"

const socket = io.connect(url)

socket.on('connect', () => {
    new Client(socket)
})
socket.on('disconnect', () => {
    location.reload()
})
socket.on('game_is_over', () => {
    location.reload()
})