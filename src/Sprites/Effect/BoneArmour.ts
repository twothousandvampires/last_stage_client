import Sprite from "../Sprite";

export default class BoneArmour extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 8
        this.max_frame_tick = 4
        this.sprite_h = 75
        this.sprite_w = 75
        this.sprite_name = 'fire_explosion'
        this.by_centr = true
        this.y_frame_offset = 315
    }
}