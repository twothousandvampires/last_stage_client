import Sprite from "../Sprite";

export default class FrostExplosionMedium extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 2
        this.sprite_h = 80
        this.sprite_w = 80
        this.sprite_name = 'pack1'
        this.removable = true
       
        this.y_frame_offset = 80
    
        this.by_centr = true
    }
}