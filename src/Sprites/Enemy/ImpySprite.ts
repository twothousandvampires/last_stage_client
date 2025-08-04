import UnitSprite from "../UnitSprite.js"

export default class ImpySprite extends UnitSprite{

   
    constructor(id: string){
      super(id)
      this.real_x = 6
      this.real_y = 7
    }
    
    setState(state: string){
        this.state = state
      
        if(this.state === 'spawn'){
            this.sprite_name = 'impy1'
            this.y_frame_offset = 400
            this.max_frame = 9
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'impy1'
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 4
        }
        else if(this.state === 'move'){
            this.sprite_name = 'impy1'
            this.y_frame_offset = 80
            this.max_frame = 6
            this.max_frame_tick = 4
        }
        else if(this.state === 'dying'){
            let r = Math.random()
            if(r < 0.5){
                this.sprite_name = 'impy2'
                this.y_frame_offset = 0
                this.max_frame = 8
                this.max_frame_tick = 2
                this.repeatable = false
            }
            else{   
                this.sprite_name = 'impy2'
                this.y_frame_offset = 80
                this.max_frame = 8
                this.max_frame_tick = 2
                this.repeatable = false
            }
        }
        else if(this.state === 'dead'){
            this.is_bottom = true
            this.removable = true
            let r = Math.random()
            if(r < 0.5){
                this.sprite_name = 'impy3'
                this.max_frame = 11
                this.max_frame_tick = 100
                this.repeatable = false
            }
            else{   
                this.sprite_name = 'impy3'
                this.max_frame = 11
                this.max_frame_tick = 100
                this.repeatable = false
            }
        }
        else if(this.state === 'attack'){
            let r = Math.random()
            if(r < 0.5){
                this.sprite_name = 'impy1'
                this.y_frame_offset = 240
                this.max_frame = 6
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 5
            }
            else{   
                this.sprite_name = 'impy1'
                this.y_frame_offset = 320
                this.max_frame = 6
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 5
            }
        }
        else if(this.state === 'explode'){
            this.removable = true
            this.sprite_name = 'impy4'
            this.y_frame_offset = 320
            this.max_frame = 7
            this.max_frame_tick = 3
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'impy4'
            this.y_frame_offset = 400
            this.max_frame = 8
            this.max_frame_tick = 3
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'impy4'
            this.y_frame_offset = 0
            this.max_frame = 5
            this.max_frame_tick = 3
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'impy4'
            this.y_frame_offset = 80
            this.max_frame = 1
            this.max_frame_tick = 10000
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.sprite_name = 'impy4'
            this.y_frame_offset = 160
            this.max_frame = 10
            this.max_frame_tick = 2
        }
        else if(this.state === 'burn_dying'){
            this.removable = true
            this.sprite_name = 'impy4'
            this.y_frame_offset = 240
            this.max_frame = 14
            this.max_frame_tick = 3
        }
    }
}