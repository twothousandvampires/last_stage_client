import UnitSprite from "../UnitSprite"

export default class Boss extends UnitSprite{
   
    real_x: number
    real_y: number
    constructor(id: string){
      super(id)
      this.real_x = 10
      this.real_y = 20
      this.sprite_h = 120
      this.sprite_w = 120
    }
    
    setState(state: string){
        this.state = state
       
        if(this.state === 'spawn'){
            this.sprite_name = 'boss1'
            this.y_frame_offset = 240
            this.max_frame = 19
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'boss1'
            this.y_frame_offset = 0
            this.max_frame = 6
            this.max_frame_tick = 10
                       
        }
        else if(this.state === 'move'){
            this.sprite_name = 'boss1'
            this.y_frame_offset = 120
            this.max_frame = 12
            this.max_frame_tick = 10
        }
        else{
            this.sprite_name = 'boss1'
            this.y_frame_offset = 0
            this.max_frame = 6
            this.max_frame_tick = 10
            this.removable = true
        }
    }
}