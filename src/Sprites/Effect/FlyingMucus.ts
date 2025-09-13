import Sprite from "../Sprite";

export default class FlyingMucus extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = 2
        this.sprite_h = 30
        this.sprite_w = 30
        this.y_frame_offset = 810
        this.sprite_name = 'pack6'
    }
}