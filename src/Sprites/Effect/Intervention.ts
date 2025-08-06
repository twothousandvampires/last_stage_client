import Sprite from "../Sprite";

export default class Intervention extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 20
        this.max_frame_tick = 2
        this.sprite_h = 50
        this.sprite_w = 50
        this.sprite_name = 'pack4'
        this.y_frame_offset = 500
    }
}