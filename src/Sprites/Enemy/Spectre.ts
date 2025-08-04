import UnitSprite from "../UnitSprite.js"

export default class Spectre extends UnitSprite{
   
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
            this.sprite_name = 'specter1'
            this.y_frame_offset = 320
            this.max_frame = 10
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.sprite_name = 'specter1'
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick = 10                       
        }
        else if(this.state === 'move'){
            this.sprite_name = 'specter1'
            this.y_frame_offset = 80
            this.max_frame = 8
            this.max_frame_tick = 10
        }
        else if(this.state === 'cast'){
            this.sprite_name = 'specter1'
            this.y_frame_offset = 400
            this.max_frame = 13
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 13
        }
        else if(this.state === 'dying'){
            let r = Math.random()
            this.sprite_name = 'specter2'
            this.repeatable = false
            if(r < 0.5){
                this.y_frame_offset = 0
                this.max_frame = 11
                this.max_frame_tick = 4
            }
            else{   
                this.y_frame_offset = 80
                this.max_frame = 16
                this.max_frame_tick = 4
            }
        }
        else if(this.state === 'dead'){
            this.y_frame_offset = 160
            this.is_bottom = true
            this.sprite_name = 'specter2'
            this.max_frame = 1
            this.max_frame_tick = 1
            this.removable = true 
        }
        else if(this.state === 'dead_with_skull'){
            this.y_frame_offset = 160
            this.is_bottom = true
            this.sprite_name = 'specter2'
            this.max_frame = 1
            this.max_frame_tick = 1
        }
        else if(this.state === 'ressurect'){
            this.sprite_name = 'specter3'
            this.repeatable = false
            let r = Math.random()
            if(r < 0.5){    
                this.y_frame_offset = 0           
                this.max_frame = 11
                this.max_frame_tick = 4
            }
            else{              
                this.y_frame_offset = 80
                this.max_frame = 16
                this.max_frame_tick = 4
            }
        }
        else if(this.state === 'attack'){
            let r = Math.random()
            this.sprite_name = 'specter1'

            if(r < 0.5){
                this.y_frame_offset = 160
                this.max_frame = 10
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 7
            }
            else{
                this.y_frame_offset = 240
                this.max_frame = 10
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 7
            }
        }
        else if(this.state === 'explode'){
            this.removable = true
            this.sprite_name = 'specter4'
            this.y_frame_offset = 320
            this.max_frame = 8
            this.max_frame_tick = 2
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'specter4'
            this.y_frame_offset = 400
            this.max_frame = 5
            this.max_frame_tick = 3
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'specter4'
            this.y_frame_offset = 0
            this.max_frame = 1
            this.max_frame_tick = 4
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'specter4'
            this.y_frame_offset = 80
            this.max_frame = 7
            this.max_frame_tick = 10
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.sprite_name = 'specter4'
            this.y_frame_offset = 160
            this.max_frame = 12
            this.max_frame_tick = 2
        }
        else if(this.state === 'burn_dying'){
            this.removable = true
            this.sprite_name = 'specter4'
            this.y_frame_offset = 240
            this.max_frame = 12
            this.max_frame_tick = 3
        }
    }
}