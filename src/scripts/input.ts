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
    touches: any
  
    constructor(socket: any) {
        this.canvas = document.getElementById('canvas')
        this.canvas.addEventListener('contextmenu', e => e.preventDefault())
        this.socket = socket
        this.click = false
        this.touches = document.getElementsByClassName('dir-btn')
        this.pressed = {
            canvas_x: undefined, 
            canvas_y: undefined,
            l_click: false,
            r_click: false,
            target: undefined
        }

        for(let i = 0; i < this.touches.length; i++){
            let t = this.touches[i]
            let dir = t.getAttribute('attr-dir')
            if(dir == 1){
                t.addEventListener('touchstart' , () => {
                    this.pressed[87] = true
                })
                t.addEventListener('touchend' , () => {
                    this.pressed[87] = false
                })
            }
            else if(dir == 2){
                t.addEventListener('touchstart' , () => {
                    this.pressed[87] = true
                    this.pressed[68] = true
                })
                t.addEventListener('touchend' , () => {
                    this.pressed[87] = false
                     this.pressed[68] = false
                })
            }
            else if(dir == 3){
                t.addEventListener('touchstart' , () => {
                    console.log('111s')
                    this.pressed[68] = true
                })
                t.addEventListener('touchend' , () => {
                    this.pressed[68] = false
                })
            }
             else if(dir == 4){
                t.addEventListener('touchstart' , () => {
                    this.pressed[68] = true
                    this.pressed[83] = true
                })
                t.addEventListener('touchend' , () => {
                    this.pressed[68] = false
                     this.pressed[83] = false
                })
            }
            else if(dir == 5){
                t.addEventListener('touchstart' , () => {
                    this.pressed[83] = true
                })
                t.addEventListener('touchend' , () => {
                     this.pressed[83] = false
                })
            }
            else if(dir == 6){
                t.addEventListener('touchstart' , () => {
                    this.pressed[83] = true
                    this.pressed[65] = true
                })
                t.addEventListener('touchend' , () => {
                     this.pressed[83] = false
                     this.pressed[65] = false
                })
            }
             else if(dir == 7){
                t.addEventListener('touchstart' , () => {
                    this.pressed[65] = true
                })
                t.addEventListener('touchend' , () => {
                     this.pressed[65] = false
                })
            }
             else if(dir == 8){
                t.addEventListener('touchstart' , () => {
                    this.pressed[87] = true
                    this.pressed[65] = true
                })
                t.addEventListener('touchend' , () => {
                    this.pressed[87] = true
                     this.pressed[65] = false
                })
            }
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
        this.canvas.addEventListener('mouseup',(e)=>{
            if(e.which === 1){
                this.pressed.l_click = false
                this.pressed.canvas_x = undefined
                this.pressed.canvas_y = undefined
            }
            else{           
                this.pressed.r_click = false
            }
        })
        window.addEventListener('keydown',(e)=>{
            if(e.key == ' '){
                e.preventDefault()
            }
            this.pressed[e.keyCode] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.pressed[e.keyCode] = false
        })  
    }

    public getInputs(){
        return this.pressed
    }
}