import Sprite from "../Sprite";

export default class BoneExplosion extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 3
        this.max_frame_tick = 2
        this.sprite_h = 150
        this.sprite_w = 150
        this.sprite_name = 'fire_explosion'
        this.removable = true
       
        this.y_frame_offset = 390
        this.by_centr = true
    }
}