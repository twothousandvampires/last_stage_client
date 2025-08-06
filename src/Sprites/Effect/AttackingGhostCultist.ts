import Sprite from "../Sprite";

export default class AttackingGhostCultist extends Sprite{
    constructor(id: string){
        super(id)

        this.removable = true
        this.sprite_h = 80
        this.sprite_w = 80
        this.sprite_name = 'ghost_cultist'
        
        this.set()
    }

    set(){
        let r = Math.random()
        if(r > 0.5){
            this.y_frame_offset = 0
            this.max_frame = 10
        }
        else{
            this.y_frame_offset = 80
            this.max_frame = 8
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
        this.action_time = data.action_time

        this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
    }
}