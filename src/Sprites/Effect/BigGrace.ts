import Sprite from "../Sprite";

export default class BigGrace extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 9
        this.max_frame_tick = 4
        this.sprite_h = 80
        this.sprite_w = 70
        this.sprite_name = 'grace'
        this.y_frame_offset = 240
    }
}