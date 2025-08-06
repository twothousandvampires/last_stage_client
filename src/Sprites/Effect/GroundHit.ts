import Sprite from "../Sprite";

export default class GroundHit extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 11
        this.max_frame_tick = 2
        this.sprite_h = 150
        this.sprite_w = 50
        this.sprite_name = 'pack2'
        this.removable = true
        this.y_frame_offset = 310
    }
}