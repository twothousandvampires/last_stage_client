import Sprite from "../Sprite";

export default class Armour extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 4
        this.max_frame_tick = 2
        this.sprite_h = 25
        this.sprite_w = 25
        this.y_frame_offset = 50
        this.sprite_name = 'fire_explosion'
        this.removable = true
    }
}