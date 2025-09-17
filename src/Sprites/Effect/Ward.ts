import Sprite from "../Sprite";

export default class Ward extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 20
        this.max_frame_tick = 2
        this.sprite_h = 80
        this.sprite_w = 80
        this.y_frame_offset = 840
        this.sprite_name = 'pack6'
    }
}