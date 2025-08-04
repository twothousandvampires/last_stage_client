export default abstract class Sprite{

    x: number | undefined
    y: number | undefined
    flipped: boolean

    box_x: number
    box_y: number
    z: number

    by_centr: boolean
    light_r: number
   
    sprite_name: string | undefined
    y_frame_offset: number
    max_frame: number
    max_frame_tick: number
    
    repeatable: boolean
    stopped: boolean
    frame_tick: number
    frame: number
    
    removable: boolean
    need_to_remove: boolean
    is_bottom: boolean
    action_time: number | undefined

    sprite_w: number | undefined
    sprite_h: number | undefined
    
    can_share_light: boolean
    light_z: number

    constructor(public id: number){
      
        this.flipped = false
        this.box_x = 0
        this.box_y = 0
        this.z = 0
        this.light_r = 0
        this.by_centr = false
        this.y_frame_offset = 0
        this.max_frame = 0
        this.max_frame_tick = 0
        this.repeatable = true
        this.stopped = false
        this.frame_tick = 0
        this.frame = 0
        
        this.removable = false
        this.need_to_remove = false
        this.is_bottom = false
        this.deleted = false
        this.can_share_light = true
        this.light_z = 0
    }

    public act(){
        if(this.stopped) return

        this.frame_tick ++
        
        if(this.frame_tick >= this.max_frame_tick){
            this.frame_tick = 0
            this.frame ++
           
            if(this.frame >= this.max_frame){
                if(this.removable){
                    this.need_to_remove = true
                }
                else if(this.repeatable){
                    this.frame = 0
                }
                else{
                    this.frame -= 1
                    this.stopped = true
                }
            }
        }
    }

    public update(data: any){
        this.x = data.x
        this.y = data.y
        this.flipped = data.flipped
        this.box_x = data.box_x
        this.box_y = data.box_y
        this.z = data.z
        this.light_r = data.light_r
    }
}