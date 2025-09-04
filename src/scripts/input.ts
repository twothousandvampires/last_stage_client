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
    touchZone: any
    last: any[] = []
   
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
        this.setInputs()
    }

    setInputs(){
        if(!this.isTouchDevice()){
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
        else{
            this.createTouchZone()
        }
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    createTouchZone() {
        this.touchZone = document.createElement('div');
        this.touchZone.style.cssText = `
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: red;
            touch-action: none;
        `;
    
        this.touchZone.addEventListener('touchstart', (e) =>{
            e.stopPropagation()
            e.preventDefault();
            this.updateDirection(e);
        }, { passive: false });
        
        this.touchZone.addEventListener('touchmove', (e) => {
               e.stopPropagation()
            e.preventDefault();
            this.updateDirection(e);
        }, { passive: false });
    
        this.touchZone.addEventListener('touchend', (e) => {
               e.stopPropagation()
            e.preventDefault();
            this.last.forEach(key => {
                this.pressed[key] = false
            })
        }, { passive: false });

       this.canvas.addEventListener('touchstart', (e) => {
           e.preventDefault();
            const touch = e.touches[0];
            
            // Получаем координаты относительно канваса
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;    // Масштаб по X
            const scaleY = this.canvas.height / rect.height;  // Масштаб по Y
            
            const canvasX = (touch.clientX - rect.left) * scaleX;
            const canvasY = (touch.clientY - rect.top) * scaleY;
            
            // Делим на 5 как в вашем примере
            let x = Math.floor(canvasX / 5);
            let y = Math.floor(canvasY / 5);
            
            this.pressed.canvas_x = x;
            this.pressed.canvas_y = y;
        
            this.pressed.l_click = true
             console.log(this.pressed)
            setTimeout(()=>{
                this.pressed.l_click = false
                this.pressed.canvas_x = undefined
                this.pressed.canvas_y = undefined
            }, 50)
        });

        this.canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
        });
    
        document.getElementById('joystick').appendChild(this.touchZone);
    }

    public getInputs(){
        return this.pressed
    }

     updateDirection(e) {
        const touch = e.touches[0];
        let rect = this.touchZone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if(distance > 12){
            const newDirection = this.getDirectionFromAngle(angle);
            this.last.forEach(key => {
                this.pressed[key] = false
            })
            this.last = newDirection
            newDirection.forEach(key => {
                this.pressed[key] = true
            })
        }
    }

    getDirectionFromAngle(angle: number) {
        const directions = [
            { min: -22.5, max: 22.5, dir: [68] },
            { min: 22.5, max: 67.5, dir: [68, 83] },
            { min: 67.5, max: 112.5, dir: [83] },
            { min: 112.5, max: 157.5, dir: [83, 65] },
            { min: 157.5, max: 202.5, dir: [65] },
            { min: 202.5, max: 247.5, dir: [65, 87] },
            { min: 247.5, max: 292.5, dir: [87] },
            { min: 292.5, max: 337.5, dir: [87, 68]},
            { min: 337.5, max: 382.5, dir: [68] }
        ];
        
        const normalizedAngle = (angle + 360) % 360;
        
        for (const sector of directions) {
            if (normalizedAngle >= sector.min && normalizedAngle < sector.max) {
                return sector.dir;
            }
        }
        return [];
    }
}