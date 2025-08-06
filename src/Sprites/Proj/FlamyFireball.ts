import Sprite from "../Sprite";

export default class FlamyFireball extends Sprite{
    constructor(id: string){
        super(id)
        this.sprite_name = 'impy_fireball'
        this.max_frame = 5
        this.max_frame_tick = 4
        this.sprite_h = 30
        this.sprite_w = 30
    }
}