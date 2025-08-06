import Sprite from "../Sprite";

export default class StaticField extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 10
        this.max_frame_tick = 2
        this.sprite_h = 150
        this.sprite_w = 100
        this.sprite_name = 'pack4'
        this.y_frame_offset = 310
        this.by_centr = true
    }
}