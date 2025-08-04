export default class Sprite {
    id;
    x;
    y;
    flipped;
    box_x;
    box_y;
    z;
    by_centr;
    light_r;
    sprite_name;
    y_frame_offset;
    max_frame;
    max_frame_tick;
    repeatable;
    stopped;
    frame_tick;
    frame;
    removable;
    need_to_remove;
    is_bottom;
    action_time;
    sprite_w;
    sprite_h;
    can_share_light;
    light_z;
    constructor(id) {
        this.id = id;
        this.flipped = false;
        this.box_x = 0;
        this.box_y = 0;
        this.z = 0;
        this.light_r = 0;
        this.by_centr = false;
        this.y_frame_offset = 0;
        this.max_frame = 0;
        this.max_frame_tick = 0;
        this.repeatable = true;
        this.stopped = false;
        this.frame_tick = 0;
        this.frame = 0;
        this.removable = false;
        this.need_to_remove = false;
        this.is_bottom = false;
        this.deleted = false;
        this.can_share_light = true;
        this.light_z = 0;
    }
    act() {
        if (this.stopped)
            return;
        this.frame_tick++;
        if (this.frame_tick >= this.max_frame_tick) {
            this.frame_tick = 0;
            this.frame++;
            if (this.frame >= this.max_frame) {
                if (this.removable) {
                    this.need_to_remove = true;
                }
                else if (this.repeatable) {
                    this.frame = 0;
                }
                else {
                    this.frame -= 1;
                    this.stopped = true;
                }
            }
        }
    }
    update(data) {
        this.x = data.x;
        this.y = data.y;
        this.flipped = data.flipped;
        this.box_x = data.box_x;
        this.box_y = data.box_y;
        this.z = data.z;
        this.light_r = data.light_r;
    }
}
