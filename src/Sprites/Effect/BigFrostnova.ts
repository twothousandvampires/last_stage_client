import Sprite from "../Sprite";

export default class BigFrostnova extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 12
        this.max_frame_tick = 2
        this.sprite_h = 250
        this.sprite_w = 250
        this.sprite_name = 'pack2'
        this.removable = true
        this.by_centr = true
        this.y_frame_offset = 60
        this.is_bottom = true
    }
}