import Sprite from "../Sprite";

export default class LigthNova extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 8;
        this.max_frame_tick = 1;
        this.sprite_w = 120;
        this.sprite_h = 120;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 930;
        this.by_centr = true;
        this.is_bottom = true
        this.removable = true
    }
}