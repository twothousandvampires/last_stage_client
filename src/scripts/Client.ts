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

        let info = document.getElementById('info')
        
        if(info){
            info.title = 'click to show info'
              info?.addEventListener('click', () => {
                let state = info.getAttribute('attr-closed')
                if(state == '1'){
                    info.setAttribute('attr-closed', '0')
                    info.style.width = 'auto'
                    info.style.height = 'auto'
                    info.style.bottom = '90%'
                    info.style.left = '10px'
                    info.innerText = 'INFO'
                }
                else{
                    info.setAttribute('attr-closed', '1')
                    info.style.width = '100vw'
                    info.style.height = '100%'
                    info.style.bottom = 'auto'
                    info.style.left = 'auto'
                    if('ontouchstart' in window || navigator.maxTouchPoints > 0){
                        info.innerText = `Use the stick in the lower left corner to move.
Tap the screen to use skills. Single tap - uses the first skill, long tap uses the second and third skills (if there are enough resources).
Tap on the shield for protection. Tap the yellow circle to use the utility skill (if it requires coordinates on the field, the last tap on it will be used).You can move and attack at the same time. 
Take 2 items, distribute stats and press ready button.`
                    }
                    else{
                         info.innerText = `Use WASD to move, space to block, E to use utility abilities.`
                    }
                }
            })
        
        }
      
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
    }
    private startGame(){
        let tick = 0
        this.input = new Input(this.socket)
        this.render = new Render(this.socket)

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
            console.log(Date.now() - time, work)
        })
    }
}