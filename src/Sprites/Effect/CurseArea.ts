import Sprite from "../Sprite";

export default class CurseArea extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 11
        this.max_frame_tick = 1
        this.sprite_w = 100
        this.sprite_h = 100
        this.sprite_name = 'pack3'
        this.y_frame_offset = 430
        this.removable = true
        this.by_centr = true
        this.is_bottom = true
    }
}