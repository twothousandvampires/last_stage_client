import Input from "./input.js";
import Render from "./Render.js";
import Sound from "./Sound.js";
import UI from "./UI.js";

export default class Client{

    socket: any
    input: Input | undefined
    render: Render | undefined
    UI: UI
    loop_interval: any

    constructor(socket: any){
        this.socket = socket
        this.UI = new UI(socket)
        this.initSocket()
    }
    
    private initSocket(){
        this.socket.on('update_lobby_data', (data, items) => {
            this.UI.updateStats(data, items)
        })

        this.socket.on('start', (players_data: any) => {
            this.UI.showGameCanvas(players_data)
            this.startGame()
            Sound.back.play()
        })

        this.socket.on('server_status', (game_is_started: boolean) => {
            if(game_is_started){
                // todo
            }
            else{
                
            }
        })
       
        this.socket.on('new_status' ,(status) => {
           this.UI.newStatus(status)
        })
        this.socket.on('change_level', (level_id: number) => {
           this.render?.actors.get(this.socket.id).setLevelId(level_id)
        })
        this.socket.on('show_upgrades', (upgrades: number) => {
           this.UI.showUpgrades(upgrades)
        })
        this.socket.on('close_upgrades', () => {
            this.UI.clsoeUpgrades()
        })

        this.socket.on('update_skill' ,(data) => {
           this.UI.updateSkill(data)
        })
    }
    private startGame(){
        this.input = new Input(this.socket)
        this.render = new Render(this.socket)

        this.loop_interval = setInterval(() => {
            let inputs = this.input?.getInputs()
            this.render?.draw(inputs)
            this.socket.emit('inputs', inputs)
        }, 30)

        this.socket.on('tick_data', (server_data: any) => {
            Sound.updateData(server_data, this.render?.getPlayerSprite())
            this.render?.updateData(server_data)
        })
    }
}