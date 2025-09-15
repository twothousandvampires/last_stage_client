import UnitSprite from "../UnitSprite"

export default class Statue extends UnitSprite{
   
    real_x: number
    real_y: number
    constructor(id: string){
      super(id)
      this.real_x = 10
      this.real_y = 20
    }
    
    setState(state: string){
        this.state = state
       
        if(this.state === 'spawn'){
            this.sprite_name = 'statue1'
            this.y_frame_offset = 80
            this.max_frame = 13
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'statue1'
            this.y_frame_offset = 0
            this.max_frame = 0
            this.max_frame_tick = 1000
                       
        }
        else if(this.state === 'cast'){
            this.sprite_name = 'statue1'
            this.y_frame_offset = 160
            this.max_frame = 11
            this.max_frame_tick = 4
        }
        else{
            this.sprite_name = 'statue1'
            this.y_frame_offset = 0
            this.max_frame = 0
            this.max_frame_tick = 1
            this.removable = true
        }
    }
}