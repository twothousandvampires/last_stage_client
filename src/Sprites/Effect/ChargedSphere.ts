import Sprite from "../Sprite";

export default class ChargedSphere extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 11
        this.max_frame_tick = 3
        this.sprite_h = 50
        this.sprite_w = 50
        this.sprite_name = 'pack2'
        this.y_frame_offset = 760
    }
}