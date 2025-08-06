import Sprite from "../Sprite";

export default class BloodSphere extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 7;
        this.max_frame_tick = 6;
        this.sprite_h = 60;
        this.sprite_w = 60;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 130;
    }
}