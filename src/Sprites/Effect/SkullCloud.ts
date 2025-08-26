import Sprite from "../Sprite";

export default class SkullCloud extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 20
        this.max_frame_tick = 2
        this.sprite_h = 100
        this.sprite_w = 100
        this.sprite_name = 'pack4'
        this.by_centr = true
        this.is_bottom = true
        this.removable = true
       
        this.y_frame_offset = 675
    }
}