import Sprite from "../Sprite";

export default class ClosedGate extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 20000
        this.sprite_h = 70
        this.sprite_w = 55
        this.y_frame_offset = 0
        this.sprite_name = 'pack6'
    }
}