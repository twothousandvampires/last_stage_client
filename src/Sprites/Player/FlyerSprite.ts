import UnitSprite from "../UnitSprite.js"

export default class FlyerSprite extends UnitSprite{

    resource: number
    max_resource: number
    life_status: number
    first: boolean | undefined
    secondary: boolean | undefined
    finisher: boolean | undefined
    utility: boolean | undefined
    level_id: number
    second: any
 
    constructor(id: number){
      super(id)
      this.resource = 0
      this.max_resource = 0
      this.life_status = 0
      this.real_x = 6
      this.real_y = 10
      this.can_share_light = false
      this.level_id = 0
      this.light_z = 6
    }

    update(data: any){
        super.update(data)
        this.resource = data.resource
        this.max_resource = data.max_resource
        this.life_status = data.life_status
        this.first = data.first
        this.secondary = data.secondary
        this.finisher = data.finisher
        this.utility = data.utility
        this.second = data.second
    }

    setLevelId(id: number){
        this.level_id = id
    }
    
    setState(state: string){
        this.state = state
        this.min_frame = 0

        if(this.state === 'idle'){
            this.sprite_name = 'flyer1'
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick = 8
        }
        else if(this.state === 'move'){
            this.sprite_name = 'flyer1'
            this.y_frame_offset = 80
            this.max_frame = 7
            this.max_frame_tick = 8
        }
        else if(this.state === 'cast'){
            let r = Math.random()
            if(r < 0.33){
                this.sprite_name = 'flyer2'
                this.y_frame_offset = 0
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 6
                this.repeatable = false
            }
            else if(r < 0.66){
                this.sprite_name = 'flyer2'
                this.y_frame_offset = 80
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 6
                this.repeatable = false
            }
            else{
                this.sprite_name = 'flyer2'
                this.y_frame_offset = 160
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
                this.action_frame = 6
                this.repeatable = false
            }
        }
        else if(this.state === 'damaged'){
            this.sprite_name = 'flyer1'
            this.y_frame_offset = 160
            this.max_frame = 2
            this.max_frame_tick = 1
        }
        else if(this.state === 'defend'){
            this.sprite_name = 'flyer2'
            this.y_frame_offset = 240
            this.max_frame = 8
            this.max_frame_tick = 6
            this.min_frame = 3
        }
        else if(this.state === 'dying'){
            this.sprite_name = 'flyer1'
            this.y_frame_offset = 240
            this.max_frame = 7
            this.max_frame_tick = Math.round( (1500 / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'dead'){
            this.sprite_name = 'flyer1'
            this.y_frame_offset = 320
            this.max_frame = 1
            this.max_frame_tick = 1000000
            this.repeatable = false
        }
        else if(this.state === 'special'){
            this.sprite_name = 'swordman1'
            this.y_frame_offset = 400
            this.max_frame = 9
            this.max_frame_tick = Math.round( (1500 / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 560
            this.max_frame = 1
            this.max_frame_tick = 100000
        }
        else if(this.state === 'freezed_dying'){
            this.repeatable = false
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 640
            this.max_frame = 8
            this.max_frame_tick = 2
        }
        else if(this.state === 'fly up'){
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick =  Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
            this.action_frame = 7
        }
        else if(this.state === 'fly down'){
            this.can_share_light = false
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 80
            this.max_frame = 7
            this.max_frame_tick =  Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
            this.action_frame = 7
        }
        else if(this.state === 'light beacon'){
            this.can_share_light = true
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 160
            this.max_frame = 5
            this.max_frame_tick =  6
        }
        else if(this.state === 'explode'){
            this.repeatable = false
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 240
            this.max_frame = 5
            this.max_frame_tick = 3
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 320
            this.max_frame = 7
            this.max_frame_tick = 3
        }
        else if(this.state === 'teleport start'){
            this.repeatable = false
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 400
            this.max_frame = 12
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 11
        }
        else if(this.state === 'teleport end'){
            this.repeatable = false
            this.sprite_name = 'flyer3'
            this.y_frame_offset = 480
            this.max_frame = 12
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.action_frame = 11
        }
    }
}