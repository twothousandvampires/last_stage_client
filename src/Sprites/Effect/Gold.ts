import Sprite from "../Sprite";

export default class Gold extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = 3
        this.sprite_h = 40
        this.sprite_w = 40
        this.y_frame_offset = 530
        this.sprite_name = 'pack6'
        this.removable = true
    }
}
