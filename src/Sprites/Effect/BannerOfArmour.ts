import Sprite from "../Sprite";

export default class BannerOfArmour extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 9
        this.max_frame_tick = 2
        this.sprite_h = 75
        this.sprite_w = 75
        this.sprite_name = 'pack4'
        this.by_centr = true
        this.is_bottom = true
       
        this.y_frame_offset = 110
    }
}