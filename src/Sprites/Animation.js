export default class Animation {
    y_frame_offset;
    max_frame_tick;
    frame;
    max_frame;
    frame_tick;
    sprite_name;
    repeatable;
    sprite_w;
    sprite_h;
    stopped;
    action_frame;
    action;
    constructor() {
        this.max_frame = 0;
        this.frame_tick = 0;
        this.max_frame_tick = 0;
        this.frame = 0;
        this.y_frame_offset = 0;
        this.sprite_name = undefined;
        this.repeatable = true;
        this.sprite_w = 80;
        this.sprite_h = 80;
        this.stopped = false;
        this.action = false;
    }
    reset() {
        this.frame = 0;
        this.frame_tick = 0;
    }
    act() {
        if (this.stopped)
            return;
        this.frame_tick++;
        if (this.frame_tick >= this.max_frame_tick) {
            this.frame_tick = 0;
            this.frame++;
            if (this.action_frame === this.frame) {
                this.action = true;
            }
            else {
                this.action = false;
            }
            if (this.frame >= this.max_frame) {
                if (this.repeatable) {
                    this.frame = 0;
                }
                else {
                    this.frame -= 1;
                    this.stopped = true;
                }
            }
        }
    }
}
