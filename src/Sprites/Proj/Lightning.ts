import Sprite from "../Sprite";

export default class Lightning extends Sprite{
    constructor(id: string){
        super(id)
        this.sprite_name = 'lightning'
        this.y_frame_offset = 0
        this.max_frame = 8
        this.max_frame_tick = 1
        this.sprite_h = 50
        this.sprite_w = 50
    }
}