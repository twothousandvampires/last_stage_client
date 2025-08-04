import Input from "./input.js";
import Render from "./Render.js";
import Sound from "./Sound.js";
import UI from "./UI.js";
export default class Client {
    socket;
    input;
    render;
    UI;
    loop_interval;
    constructor(socket) {
        this.socket = socket;
        this.UI = new UI(socket);
        this.initSocket();
    }
    initSocket() {
        this.socket.on('update_lobby_data', (data, items) => {
            this.UI.updateStats(data, items);
        });
        this.socket.on('start', (players_data) => {
            this.UI.showGameCanvas(players_data);
            this.startGame();
            Sound.back.play();
        });
        this.socket.on('server_status', (game_is_started) => {
            if (game_is_started) {
                // todo
            }
            else {
            }
        });
        this.socket.on('new_status', (status) => {
            this.UI.newStatus(status);
        });
        this.socket.on('change_level', (level_id) => {
            this.render?.actors.get(this.socket.id).setLevelId(level_id);
        });
        this.socket.on('show_upgrades', (upgrades) => {
            this.UI.showUpgrades(upgrades);
        });
        this.socket.on('close_upgrades', () => {
            this.UI.clsoeUpgrades();
        });
        this.socket.on('update_skill', (data) => {
            this.UI.updateSkill(data);
        });
    }
    startGame() {
        this.input = new Input(this.socket);
        this.render = new Render(this.socket);
        this.loop_interval = setInterval(() => {
            let inputs = this.input?.getInputs();
            this.render?.draw(inputs);
            this.socket.emit('inputs', inputs);
        }, 30);
        this.socket.on('tick_data', (server_data) => {
            Sound.updateData(server_data, this.render?.getPlayerSprite());
            this.render?.updateData(server_data);
        });
    }
}
