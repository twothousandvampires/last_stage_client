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
    touch_zone: any
    second_touch_zone: any
    last: any[] = []
    last_touch_time: number = Date.now()
    canvas_touch_event: TouchEvent | undefined
    long_touch: any
    was_long_touch: boolean = false
    special_pressed: boolean = false
    stick_touch_id: any
    second_stick_touch_id: any

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
            target: undefined,
            mobile: false,
            touch_angle: undefined
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
            this.pressed.mobile = true
            this.createTouchZone()
        }
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    createTouchZone() {
    
        let special_div = document.createElement('div');
        special_div.id = 'special'

        let defend_div = document.createElement('div');
        defend_div.id = 'defend'

        special_div.addEventListener('touchstart', (e) => {
            e.preventDefault()
            this.pressed[69] = true
        })

        special_div.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.pressed[69] = false
        })

        defend_div.addEventListener('touchstart', (e) => {
            e.preventDefault()
            this.pressed[32] = true
        })

        defend_div.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.pressed[32] = false
        })

        let wrap = document.createElement('div')
        wrap.id = 'defend_and_special'
         wrap.appendChild(special_div)
        wrap.appendChild(defend_div)
       

        document.getElementsByTagName('body')[0].appendChild(wrap)

        let touch_zone = document.createElement('div')
        touch_zone.id = 'touch-zone'
        this.touch_zone = touch_zone
        touch_zone.addEventListener('touchstart', (e: TouchEvent) => {
            e.stopPropagation()
            this.updateDirection(e.changedTouches[0]);
            this.stick_touch_id = e.changedTouches[0].identifier
            e.preventDefault()
        }, { passive: false });
        
        touch_zone.addEventListener('touchmove', (e: TouchEvent) => {
            e.stopPropagation()
            const touch = Array.from(e.touches).find(t => t.identifier === this.stick_touch_id);
            if(touch) {
                this.updateDirection(touch);
            }
            e.preventDefault();
        }, { touch_zone: false });
    
        touch_zone.addEventListener('touchend', (e: TouchEvent) => {
            e.stopPropagation()

            const touch = Array.from(e.changedTouches).find(t => t.identifier === this.stick_touch_id);

            if(touch) {
                this.last.forEach(key => {
                    this.pressed[key] = false
                })
                this.stick_touch_id = undefined
            }
           
             e.preventDefault();
        }, { touch_zone: false });

        document.getElementsByTagName('body')[0].appendChild(touch_zone)
        this.createSecondZone()

    }

    createSecondZone(){
        let second_touch_zone = document.createElement('div')
        second_touch_zone.id = 'second-touch-zone'
        this.second_touch_zone = second_touch_zone

        second_touch_zone.addEventListener('touchstart', (e: TouchEvent) => {
            e.stopPropagation()
            
            this.updateDirection2(e.changedTouches[0]);
     
            this.second_stick_touch_id = e.changedTouches[0].identifier
            e.preventDefault()

        }, { passive: false })

        second_touch_zone.addEventListener('touchend', (e: TouchEvent) => {
            e.stopPropagation()
            
            const touch = Array.from(e.changedTouches).find(t => t.identifier === this.second_stick_touch_id);
            if(touch) {
                if(this.was_long_touch){
                this.was_long_touch = false
                this.pressed.r_click = false
                this.pressed.canvas_x = undefined
                this.pressed.canvas_y = undefined
                }
                else{
                    clearTimeout(this.long_touch)
                    
                    this.pressed.l_click = true
                    
                    setTimeout(()=>{
                        this.pressed.l_click = false
                        this.pressed.canvas_x = undefined
                        this.pressed.canvas_y = undefined
                    }, 50)
                } 

                this.second_stick_touch_id = undefined
            }
            
            this.pressed.touch_angle = undefined
            e.preventDefault()

        }, { touch_zone: false })

        document.getElementsByTagName('body')[0].appendChild(second_touch_zone)
    }

    public getInputs(){
        return this.pressed
    }

    updateDirection2(t){
        const touch = t;
        let rect = this.second_touch_zone.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        
        
        // let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // angle = (angle - 90) % 360;

        let angle = Math.atan2(deltaY, deltaX)

        angle = -angle + Math.PI / 2;

        // Нормализуем в диапазон [0, 2π)
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        if (angle >= 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }

        this.pressed.touch_angle = angle
        
        this.pressed.canvas_x = 40 + (Math.sin(angle) *  Math.floor(distance/ 3))
        this.pressed.canvas_y = 40 + (Math.cos(angle) *  Math.floor(distance/ 3))
        this.pressed.over_x = this.pressed.canvas_x
        this.pressed.over_y = this.pressed.canvas_y
         
        this.long_touch = setTimeout(() => {
            this.pressed.r_click = true
            this.was_long_touch = true            
        }, 250);

    }
    updateDirection(t) {
        const touch = t
        let rect = this.touch_zone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        
        let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
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
        else{
            this.last.forEach(key => {
                this.pressed[key] = false
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