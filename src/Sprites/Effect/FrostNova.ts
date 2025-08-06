import Sprite from "../Sprite";

export default class FrostNova extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 11
        this.max_frame_tick = 2
        this.sprite_h = 100
        this.sprite_w = 100
        this.sprite_name = 'fire_explosion'
        this.removable = true
        this.by_centr = true
        this.y_frame_offset = 215
        this.is_bottom = true
    }
}