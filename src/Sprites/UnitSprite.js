import Sprite from "./Sprite.js";
export default class UnitSprite extends Sprite {
    state;
    action;
    action_frame;
    is_action_frame;
    min_frame;
    real_x;
    real_y;
    constructor(id) {
        super(id);
        this.action = false;
        this.is_action_frame = false;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.min_frame = 0;
    }
    act() {
        if (this.stopped)
            return;
        this.frame_tick++;
        if (this.frame_tick >= this.max_frame_tick) {
            this.frame_tick = 0;
            this.frame++;
            if (this.action_frame === this.frame) {
                this.is_action_frame = true;
            }
            else {
                this.is_action_frame = false;
            }
            if (this.frame >= this.max_frame) {
                if (this.removable) {
                    this.need_to_remove = true;
                }
                else if (this.repeatable) {
                    this.frame = this.min_frame;
                }
                else {
                    this.frame -= 1;
                    this.stopped = true;
                }
            }
        }
    }
    update(data) {
        super.update(data);
        this.action = data.action;
        this.action_time = data.action_time;
        if (this.state != data.state || !this.state) {
            this.reset();
            this.setState(data.state);
        }
    }
    reset() {
        this.frame = 0;
        this.frame_tick = 0;
        this.stopped = false;
        this.stopped = false;
        this.repeatable = true;
        this.is_action_frame = false;
        this.action_frame = undefined;
        this.action = false;
        this.removable = false;
        this.is_bottom = false;
    }
}
