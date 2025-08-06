import Sprite from "../Sprite";

export default class Curse extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 9
        this.max_frame_tick = 4
        this.sprite_h = 50
        this.sprite_w = 50
        this.sprite_name = 'pack3'
        this.y_frame_offset = 380
    }
}