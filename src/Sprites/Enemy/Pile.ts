import UnitSprite from "../UnitSprite"

export default class Pile extends UnitSprite{
   
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
            this.sprite_name = 'pile1'
            this.y_frame_offset = 80
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'pile1'
            this.y_frame_offset = 0
            this.max_frame = 0
            this.max_frame_tick = 400
                        
        }
        else if(this.state === 'cast'){
            this.sprite_name = 'pile1'
            this.y_frame_offset = 160
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 7
        }
        else if(this.state === 'dying'){
            this.sprite_name = 'pile1'
            this.repeatable = false
            this.y_frame_offset = 240
            this.max_frame = 9
            this.max_frame_tick = 2
        }
        else if(this.state === 'dead'){
            this.is_bottom = true
            this.removable = true
            this.sprite_name = 'pile1'
            this.y_frame_offset = 320     
            this.max_frame = 6
            this.max_frame_tick = 20
            this.repeatable = false
        }
    }
}