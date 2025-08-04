import UnitSprite from "../UnitSprite.js"

export default class Skull extends UnitSprite{
   
    real_x: number
    real_y: number
    constructor(id: string){
      super(id)
      this.real_x = 2
      this.real_y = 2
      this.sprite_h = 50
      this.sprite_w = 50
    }
    
    setState(state: string){
        this.state = state

        if(this.state === 'idle'){
            this.sprite_name = 'skull1'
           
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 400             
        }
        else if(this.state === 'move'){
            this.sprite_name = 'skull1'
            this.y_frame_offset = 50
            this.max_frame = 6
            this.max_frame_tick = 5
        }
        else if(this.state === 'dying'){        
            this.sprite_name = 'skull1'
            this.y_frame_offset = 150
            this.max_frame = 10
            this.max_frame_tick = 2
            this.removable = true          
        }             
        else if(this.state === 'attack'){
            this.sprite_name = 'skull1'
            this.y_frame_offset = 100
            this.max_frame = 6
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 6
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'skull1'
           
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 400 
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'skull1'
           
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 400 
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'skull1'
           
            this.y_frame_offset = 200
            this.max_frame = 1
            this.max_frame_tick = 400
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.sprite_name = 'skull1'
            this.y_frame_offset = 2500
            this.max_frame = 6
            this.max_frame_tick = 2
        }
    }
}