import Sprite from "../Sprite";

export default class GhostGrip extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 5
        this.sprite_h = 40
        this.sprite_w = 40
        this.sprite_name = 'pack3'
        this.y_frame_offset = 340
    }
}