import Sprite from "../Sprite";

export default class PuddleOfPoison extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 8
        this.max_frame_tick = 7
        this.sprite_h = 100
        this.sprite_w = 100
        this.y_frame_offset = 570
        this.sprite_name = 'pack6'
        this.by_centr = true
        this.is_bottom = true
    }
}