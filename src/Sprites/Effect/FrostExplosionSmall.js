import Sprite from "../Sprite.js";
export default class FrostExplosionSmall extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 7;
        this.max_frame_tick = 2;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack1';
        this.removable = true;
        this.y_frame_offset = 160;
        this.by_centr = true;
    }
}
