export default class Input {

    canvas: any
    click: boolean
    pressed: {target: string | undefined,
        canvas_x: number | undefined,
        canvas_y: number | undefined,
        over_x: number | undefined,
        over_y: number | undefined,
        l_click: boolean,
        r_click: boolean,
        [key: string]: any}
    socket: any
  
    constructor(socket: any) {

        this.canvas = document.getElementById('canvas')
        this.canvas.addEventListener('contextmenu', e => e.preventDefault())
        this.socket = socket
        this.click = false
        this.pressed = {
            canvas_x: undefined, 
            canvas_y: undefined,
            l_click: false,
            r_click: false,
            target: undefined
        }
        
        this.canvas.addEventListener('mousemove',(e)=>{
            let x: any =  Math.floor(e.offsetX / 5)
            this.pressed.over_x = x

            let y: any =  Math.floor(e.offsetY / 5)
            this.pressed.over_y = y
        })
        this.canvas.addEventListener('mouseleave',(e)=>{
            this.pressed.over_x = undefined
            this.pressed.over_y = undefined
        })
        this.canvas.addEventListener('mousedown',(e)=>{
            let x: any =  Math.floor(e.offsetX / 5)
            this.pressed.canvas_x = x

            let y: any =  Math.floor(e.offsetY / 5)
            this.pressed.canvas_y = y
            
            if(e.which === 1){
                this.pressed.l_click = true
                setTimeout(()=>{
                    this.pressed.l_click = false
                    this.pressed.canvas_x = undefined
                    this.pressed.canvas_y = undefined
                }, 50)
            }
            else{
                this.pressed.r_click = true
                setTimeout(()=>{
                    this.pressed.r_click = false
                }, 50)
            }
        })
        window.addEventListener('keydown',(e)=>{
            // e.preventDefault()
            if(e.key == ' '){
                e.preventDefault()
            }
            this.pressed[e.key] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.pressed[e.key] = false
        })
        
    }

    public getInputs(){
        return this.pressed
    }
}