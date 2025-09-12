import Sprite from "../Sprite";

export default class ShadowDrop extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 14
        this.max_frame_tick = 2
        this.sprite_h = 150
        this.sprite_w = 50
        this.y_frame_offset = 380
        this.sprite_name = 'pack6'
        this.removable = true
    }
}
