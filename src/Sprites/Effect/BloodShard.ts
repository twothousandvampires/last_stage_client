import Sprite from "../Sprite";

export default class BloodShard extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = 1
        this.sprite_h = 30
        this.sprite_w = 30
        this.sprite_name = 'pack1'
        this.by_centr = true
        this.y_frame_offset = 690
    }
}