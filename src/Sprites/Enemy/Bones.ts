import UnitSprite from "../UnitSprite"

export default class Bones extends UnitSprite{
   
    real_x: number
    real_y: number
    constructor(id: string){
      super(id)
      this.real_x = 6
      this.real_y = 8
    }
    
    setState(state: string){
        this.state = state
       
        if(this.state === 'spawn'){
            this.sprite_name = 'bones1'
            this.y_frame_offset = 480
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'bones1'
            let r = Math.random()
            if(r < 0.33){
                this.y_frame_offset = 0
                this.max_frame = 0
                this.max_frame_tick = 400
            }
            else if(r < 0.66){
                this.y_frame_offset = 80
                this.max_frame = 6
                this.max_frame_tick = 12
            }
            else{
                this.y_frame_offset = 160
                this.max_frame = 9
                this.max_frame_tick = 12
            }              
        }
        else if(this.state === 'move'){
            this.sprite_name = 'bones1'
            this.y_frame_offset = 240
            this.max_frame = 7
            this.max_frame_tick = 8
        }
        else if(this.state === 'dying'){
            let r = Math.random()
            this.sprite_name = 'bones2'
            this.repeatable = false
            console.log(r)
            if(r < 0.5){
                this.y_frame_offset = 0
                this.max_frame = 7
                this.max_frame_tick = 3
               
            }
            else{   
                this.y_frame_offset = 80
                this.max_frame = 8
                this.max_frame_tick = 3
            }
        }
        else if(this.state === 'dead'){
            this.is_bottom = true
            this.removable = true
            this.sprite_name = 'bones3'
            let r = Math.random()
            if(r < 0.5){               
                this.max_frame = 6
                this.max_frame_tick = 50
                this.repeatable = false
            }
            else{              
                this.max_frame = 8
                this.max_frame_tick = 50
                this.repeatable = false
            }
        }
        else if(this.state === 'dead_with_skull'){
            this.sprite_name = 'bones4'
            let r = Math.random()
            if(r < 0.5){               
                this.max_frame = 10
                this.max_frame_tick = 8
                this.repeatable = false
            }
            else{              
                this.max_frame = 10
                this.max_frame_tick = 8
                this.repeatable = false
            }
        }
        else if(this.state === 'ressurect'){
            this.sprite_name = 'bones5'
            let r = Math.random()
            if(r < 0.5){               
                this.max_frame = 6
                this.max_frame_tick = 4
                this.repeatable = false
            }
            else{              
                this.y_frame_offset = 80
                this.max_frame = 8
                this.max_frame_tick = 4
                this.repeatable = false
            }
        }
        else if(this.state === 'attack'){
            let r = Math.random()
            if(r < 0.5){
                this.sprite_name = 'bones1'
                this.y_frame_offset = 320
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 7
            }
            else{   
                this.sprite_name = 'bones1'
                this.y_frame_offset = 400
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 7
            }
        }
        else if(this.state === 'explode'){
            this.removable = true
            this.sprite_name = 'bones6'
            this.y_frame_offset = 320
            this.max_frame = 5
            this.max_frame_tick = 3
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'bones6'
            this.y_frame_offset = 400
            this.max_frame = 6
            this.max_frame_tick = 3
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'bones6'
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 4
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'bones6'
            this.y_frame_offset = 80
            this.max_frame = 1
            this.max_frame_tick = 100000
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.sprite_name = 'bones6'
            this.y_frame_offset = 160
            this.max_frame = 9
            this.max_frame_tick = 2
        }
        else if(this.state === 'burn_dying'){
            this.removable = true
            this.sprite_name = 'bones6'
            this.y_frame_offset = 240
            this.max_frame = 12
            this.max_frame_tick = 3
        }
    }
}