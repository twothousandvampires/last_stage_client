import Sprite from "../Sprite";

export default class Soul extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 8;
        this.max_frame_tick = 2;
        this.sprite_w = 40;
        this.sprite_h = 80;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 1050;
        this.removable = true
    }
}