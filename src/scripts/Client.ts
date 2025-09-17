import Input from "./input";
import Render from "./Render";
import Sound from "./Sound";
import UI from "./UI";

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
        Sound.lobby_back.play()

        let record_button = document.getElementById('record')

        record_button?.addEventListener('click', () => {
            this.socket.emit('get_records')
        })

        let info_btn = document.getElementById('info')

        info_btn?.addEventListener('click', () => {
            let block = document.getElementById('game-info')
            
            if(!block) return

            block.style.display = 'block'

            if('ontouchstart' in window || navigator.maxTouchPoints > 0){
                let m_block = document.getElementById('modile-info')
                m_block.style.display = 'block'
            }
            block.addEventListener('click', () => {
                block.style.display = 'none'
            })
        })

        this.socket.on('records', (data) => {
            this.UI.createRecordsTable(JSON.parse(data))
        })

        this.socket.on('update_lobby_data', (data, items) => {
            this.UI.updateStats(data, items)
        })

        this.socket.on('start', (players_data: any) => {
            this.UI.showGameCanvas(players_data)
            Sound.lobby_back.pause()
            this.startGame()
            Sound.back.play()
        })

        this.socket.on('server_status', (data: any) => {
            if(data.status){
                let text = document.createElement('p')
                text.id = 'lobby_full'
                text.innerText = 'lobby is started or full'
                document.getElementById('wrap')?.appendChild(text)
            }
            else{
                
            }

            this.UI.createRealiseBar(data)
        })
       
        this.socket.on('new_status' ,(status) => {
           this.UI.newStatus(status)
        })

        this.socket.on('change_level', (level_id: number, x, y) => {
           this.render?.actors.get(this.socket.id).setLevelId(level_id,x ,y)
        })

        this.socket.on('show_upgrades', (upgrades: number) => {
           this.UI.showUpgrades(upgrades)
        })

        this.socket.on('show_forgings', (upgrades: number) => {
           this.UI.showForgings(upgrades)
        })

        this.socket.on('close_forgings', () => {
           this.UI.closeForgings()
        })

        this.socket.on('close_upgrades', () => {
            this.UI.clsoeUpgrades()
        })

        this.socket.on('update_skill' ,(data) => {
           this.UI.updateSkill(data)
        })

        this.socket.on('status_end' ,(name) => {
           this.UI.deleteStatus(name)
        })

        this.socket.on('suggest_items' ,(data) => {
           this.UI.createSuggestItem(data)
        })

        this.socket.on('close_suggest' ,() => {
           this.UI.closeSuggest()
        })

        this.socket.on('suggest_forgings' ,(data, item_id) => {
           this.UI.createSuggestForgings(data, item_id)
        })

        this.socket.on('suggers_record' ,(kills) => {
           this.UI.createSuggestRecord(kills)
        })

        
    }
    private startGame(){
        let tick = 0
        this.input = new Input(this.socket)
        this.render = new Render(this.socket)
        document.getElementById('top-panel').style.display = 'none'

        this.loop_interval = setInterval(() => {
            let inputs = this.input?.getInputs()
            this.render?.draw(inputs)
            tick ++
            
            if(tick % 2 === 0){
                this.socket.emit('inputs', inputs)
            }
        }, 30)

        this.socket.on('tick_data', (server_data: any, time, work) => {
            Sound.updateData(server_data, this.render?.getPlayerSprite())
            this.render?.updateData(server_data)   
        })
    }
}