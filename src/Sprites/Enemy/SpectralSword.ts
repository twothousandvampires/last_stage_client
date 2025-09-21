import UnitSprite from "../UnitSprite"

export default class SpectralSword extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 5
      this.real_y = 8
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'spectral_sword1'

        if(this.state === 'spawn'){
            this.y_frame_offset = 80
            this.max_frame = 5
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 6
            this.max_frame_tick = 6     
        }
        else if(this.state === 'move'){
            this.y_frame_offset = 0
            this.max_frame = 6
            this.max_frame_tick = 6
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 240
            this.max_frame = 13
            this.max_frame_tick = 2
            this.repeatable = false     
        }
        else if(this.state === 'dead'){
            this.removable = true
            this.y_frame_offset = 320
            this.max_frame = 1
            this.max_frame_tick = 1  
        }
        else if(this.state === 'attack'){
            this.y_frame_offset = 160
            this.max_frame = 9
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }
        else{
            this.removable = true
            this.y_frame_offset = 320
            this.max_frame = 1
            this.max_frame_tick = 1  
        }
    }
}