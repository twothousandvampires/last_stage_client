import Sprite from "../Sprite";

export default class Gate extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 200000
        this.sprite_h = 70
        this.sprite_w = 55
        this.y_frame_offset = 150
        this.sprite_name = 'pack6'
    }
}