import Sprite from "../Sprite";

export default class Teacher extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 10;
        this.max_frame_tick = 8;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 0;
    }
}