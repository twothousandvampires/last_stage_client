import Sprite from "../Sprite";

export default class GraceShard extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 9
        this.max_frame_tick = 4
        this.sprite_h = 40
        this.sprite_w = 35
        this.sprite_name = 'grace'
        this.y_frame_offset = 200
    }
}