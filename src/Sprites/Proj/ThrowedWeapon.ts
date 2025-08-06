import Sprite from "../Sprite";

export default class ThrowedWeapon extends Sprite{
    constructor(id: string){
        super(id)
        this.sprite_name = 'fire_explosion'
        this.y_frame_offset = 75
        this.max_frame = 11
        this.max_frame_tick = 1
        this.sprite_h = 40
        this.sprite_w = 40
    }
}