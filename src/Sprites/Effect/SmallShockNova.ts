import Sprite from "../Sprite";

export default class SmallShockNova extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 13
        this.max_frame_tick = 1
        this.sprite_h = 125
        this.sprite_w = 125
        this.sprite_name = 'pack4'
        this.y_frame_offset = 185
        this.removable = true
        this.by_centr = true
        this.is_bottom = true
    }
}