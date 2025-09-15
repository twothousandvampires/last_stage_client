import UnitSprite from "../UnitSprite"

export default class Slime extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 8
      this.real_y = 6
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'slime1'

        if(this.state === 'spawn'){
            this.y_frame_offset = 800
            this.max_frame = 11
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
            this.sprite_h = 150
            this.sprite_w = 80
        }
        else if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 5
            this.max_frame_tick = 6
            this.sprite_h = 80
            this.sprite_w = 80        
        }
        else if(this.state === 'move'){
            this.y_frame_offset = 80
            this.max_frame = 6
            this.max_frame_tick = 6
            this.sprite_h = 80
            this.sprite_w = 80  
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 240
            this.max_frame = 8
            this.max_frame_tick = 4
            this.repeatable = false     
        }
        else if(this.state === 'dead'){
            this.is_bottom = true
            this.removable = true
            this.y_frame_offset = 320
            this.max_frame = 1
            this.max_frame_tick = 100   
        }
        else if(this.state === 'attack'){
            this.y_frame_offset = 160
            this.max_frame = 9
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.sprite_h = 80
            this.sprite_w = 80      
        }
        else if(this.state === 'explode'){
            this.removable = true
            this.y_frame_offset = 400
            this.max_frame = 6
            this.max_frame_tick = 2
        }
        else if(this.state === 'zaped'){
            this.y_frame_offset = 640
            this.max_frame = 5
            this.max_frame_tick = 2
        }
        else if(this.state === 'freezed'){
            this.y_frame_offset = 480
            this.max_frame = 1
            this.max_frame_tick = 100000
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.y_frame_offset = 560
            this.max_frame = 7
            this.max_frame_tick = 2
        }
        else if(this.state === 'burn_dying'){
            this.removable = true
            this.y_frame_offset = 720
            this.max_frame = 9
            this.max_frame_tick = 2
        }
    }
}