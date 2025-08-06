import Sprite from "../Sprite";

export default class GhostGripArea extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 11
        this.max_frame_tick = 3
        this.sprite_h = 150
        this.sprite_w = 150
        this.sprite_name = 'pack3'
        this.removable = true
       
        this.y_frame_offset = 190
        this.by_centr = true
    }
}