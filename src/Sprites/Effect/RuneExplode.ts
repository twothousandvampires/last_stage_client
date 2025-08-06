import Sprite from "../Sprite";

export default class RuneExplode extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 6
        this.max_frame_tick = 2
        this.sprite_h = 70
        this.sprite_w = 70
        this.sprite_name = 'pack4'
        this.removable = true
        this.by_centr = true
       
        this.y_frame_offset = 40
    }
}