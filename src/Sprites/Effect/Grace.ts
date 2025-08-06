import Sprite from "../Sprite";

export default class Grace extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 19
        this.max_frame_tick = 8
        this.sprite_h = 200
        this.sprite_w = 80
        this.sprite_name = 'grace'
        this.y_frame_offset = 0
    }
}