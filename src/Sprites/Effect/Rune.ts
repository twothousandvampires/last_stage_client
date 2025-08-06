import Sprite from "../Sprite";

export default class Rune extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 14
        this.max_frame_tick = 8
        this.sprite_h = 40
        this.sprite_w = 40
        this.sprite_name = 'pack4'
        this.repeatable = false
        this.is_bottom = true
        this.y_frame_offset = 0
    }
}