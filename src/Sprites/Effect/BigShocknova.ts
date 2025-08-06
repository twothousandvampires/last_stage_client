import Sprite from "../Sprite";

export default class BigShocknova extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 13
        this.max_frame_tick = 1
        this.sprite_h = 250
        this.sprite_w = 250
        this.sprite_name = 'pack2'
        this.y_frame_offset = 460
        this.removable = true
        this.by_centr = true
        this.is_bottom = true
    }
}