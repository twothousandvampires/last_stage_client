import Sprite from "../Sprite";

export default class ToothExplode extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 3
        this.max_frame_tick = 2
        this.sprite_w = 35
        this.sprite_h = 35
        this.sprite_name = 'pack3'
        this.y_frame_offset = 530
        this.removable = true
        this.by_centr = true
    }
}