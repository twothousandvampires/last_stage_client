import Sprite from "../Sprite";

export default class SpecterVortex extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 11;
        this.max_frame_tick = 4;
        this.sprite_w = 125;
        this.sprite_h = 125;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 565;
        this.by_centr = true;
        this.is_bottom = true
    }
}
