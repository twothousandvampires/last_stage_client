import Sprite from "../Sprite";

export default class ElementalEnchanted extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 7;
        this.max_frame_tick = 6;
        this.sprite_w = 100;
        this.sprite_h = 100;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 690;
        this.by_centr = true;
        this.is_bottom = true
    }
}