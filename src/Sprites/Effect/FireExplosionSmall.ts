import Sprite from "../Sprite";

export default class FireExplosionSmall extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 4
        this.max_frame_tick = 3
        this.sprite_h = 50
        this.sprite_w = 50
        this.sprite_name = 'pack1'
        this.removable = true
       
        this.y_frame_offset = 290
        this.light_r = 4
        this.by_centr = true
    }
}