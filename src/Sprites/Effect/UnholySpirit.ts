import Sprite from "../Sprite";

export default class UnholySpirit extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 7;
        this.max_frame_tick = 4;
        this.sprite_w = 100;
        this.sprite_h = 100;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 1230;
        this.is_bottom = true
        this.by_centr = true
    }
}