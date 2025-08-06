import UnitSprite from "../UnitSprite"

export default class Gifter extends UnitSprite{
   
    real_x: number
    real_y: number
    
    constructor(id: string){
      super(id)
      this.real_x = 6
      this.real_y = 8
    }
    
    setState(state: string){
        this.state = state
        
        if(this.state === 'idle'){
            this.sprite_name = 'gifter1'
            this.y_frame_offset = 0
            this.max_frame = 19
            this.max_frame_tick = 8
        }
        else if(this.state === 'dead'){
            this.sprite_name = 'gifter1'
            this.y_frame_offset = 80
            this.max_frame = 1
            this.max_frame_tick = 0
            this.removable = true
        }
    }
}