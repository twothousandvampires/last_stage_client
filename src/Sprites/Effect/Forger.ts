import Sprite from "../Sprite";

export default class Forger extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 8
        this.sprite_h = 80
        this.sprite_w = 80
        this.y_frame_offset = 70
        this.sprite_name = 'pack6'
    }
}