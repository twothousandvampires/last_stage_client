import Sprite from "../Sprite";

export default class MetalThorns extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 6
        this.sprite_h = 100
        this.sprite_w = 100
        this.sprite_name = 'pack4'
        this.by_centr = true
        this.is_bottom = true
       
        this.y_frame_offset = 775
    }
}