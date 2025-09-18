import Sprite from "../Sprite";

export default class UnholyPower extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 7;
        this.max_frame_tick = 8;
        this.sprite_w = 100;
        this.sprite_h = 100;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 790;
        this.by_centr = true;
        this.is_bottom = true
    }
}