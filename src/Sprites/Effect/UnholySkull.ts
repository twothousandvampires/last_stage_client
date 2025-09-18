import Sprite from "../Sprite";

export default class UnholySkull extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 5;
        this.max_frame_tick = 4;
        this.sprite_w = 40;
        this.sprite_h = 40;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 890;
        this.by_centr = true;
    }
}