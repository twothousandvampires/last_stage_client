import Sprite from "../Sprite";

export default class SpecterSoulSeeker extends Sprite{
    constructor(id: string){
        super(id)
        this.sprite_name = 'projectiles1'
        this.y_frame_offset = 0
        this.max_frame = 9
        this.max_frame_tick = 3
        this.sprite_h = 30
        this.sprite_w = 30
    }
}