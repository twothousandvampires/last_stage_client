import Sprite from "../Sprite";

export default class FrostBolt extends Sprite{
    name: string
    constructor(id: string){
        super(id)
        this.sprite_name = 'small_frost_sphere'
        this.max_frame = 5
        this.max_frame_tick = 3
        this.sprite_h = 30
        this.sprite_w = 30
    }
}