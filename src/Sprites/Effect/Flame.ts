import Sprite from "../Sprite";

export default class Flame extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = 3
        this.sprite_h = 60
        this.sprite_w = 60
        this.sprite_name = 'pack2'

        this.y_frame_offset = 0
        this.light_r = 4
    }
}