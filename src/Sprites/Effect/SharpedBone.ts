import Sprite from "../Sprite";

export default class SharpedBone extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 1
        this.sprite_h = 30
        this.sprite_w = 30
        this.sprite_name = 'sharped_bone'
        this.by_centr = true
        this.y_frame_offset = 0
    }
}