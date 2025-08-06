import UnitSprite from "../UnitSprite"

export default class Solid extends UnitSprite{

   
    constructor(id: string){
      super(id)
      this.real_x = 10
      this.real_y = 14
      this.sprite_h = 100
      this.sprite_w = 100
    }
    
    setState(state: string){
        this.state = state
      
        if(this.state === 'spawn'){
            this.sprite_name = 'solid1'
            this.y_frame_offset = 300
            this.max_frame = 21
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'solid1'
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick = 6
        }
        else if(this.state === 'move'){
            this.sprite_name = 'solid1'
            this.y_frame_offset = 100
            this.max_frame = 5
            this.max_frame_tick = 6
        }
        else if(this.state === 'dying'){
            this.sprite_name = 'solid2'
            this.y_frame_offset = 0
            this.max_frame = 8
            this.max_frame_tick = 6
            this.repeatable = false
        }
        else if(this.state === 'dead'){
            this.sprite_name = 'solid3'
            this.max_frame = 11
            this.max_frame_tick = 6
            this.repeatable = false
            this.action_frame = 11
        }
        else if(this.state === 'explode'){
             this.sprite_name = 'solid4'
            this.removable = true
            this.max_frame = 6
            this.y_frame_offset = 400
            this.max_frame_tick = 3
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'solid4'
            this.max_frame = 8
            this.y_frame_offset = 500
            this.max_frame_tick = 3
        }
        else if(this.state === 'dead_explode'){
            this.sprite_name = 'solid3'
            this.max_frame = 10
            this.y_frame_offset = 100
            this.max_frame_tick = 4
            this.removable = true
        }
        else if(this.state === 'attack'){
            this.sprite_name = 'solid1'
            this.y_frame_offset = 200
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 5
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'solid4'
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick = 4
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'solid4'
            this.y_frame_offset = 100
            this.max_frame = 1
            this.max_frame_tick = 10000
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.sprite_name = 'solid4'
            this.y_frame_offset = 200
            this.max_frame = 10
            this.max_frame_tick = 2
        }
        else if(this.state === 'burn_dying'){
            this.removable = true
            this.sprite_name = 'solid4'
            this.y_frame_offset = 300
            this.max_frame = 11
            this.max_frame_tick = 3
        }
    }
}