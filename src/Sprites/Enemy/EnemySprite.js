import Sprite from "../Sprite.js";
export default class EnemySprite extends UnitSprite {
    constructor(id) {
        super(id);
    }
    setState(state) {
        this.state = state;
        if (this.state === 'spawn') {
            this.sprite_name = 'impy1';
            this.y_frame_offset = 400;
            this.max_frame = 9;
            this.max_frame_tick = 2;
            this.repeatable = false;
        }
        else if (this.state === 'idle') {
            this.sprite_name = 'impy1';
            this.y_frame_offset = 0;
            this.max_frame = 6;
            this.max_frame_tick = 4;
        }
        else if (this.state === 'move') {
            this.sprite_name = 'impy1';
            this.y_frame_offset = 80;
            this.max_frame = 6;
            this.max_frame_tick = 4;
        }
        else if (this.state === 'dying') {
            let r = Math.random();
            if (r < 0.5) {
                this.sprite_name = 'impy2';
                this.y_frame_offset = 0;
                this.max_frame = 8;
                this.max_frame_tick = 2;
                this.repeatable = false;
            }
            else {
                this.sprite_name = 'impy2';
                this.y_frame_offset = 80;
                this.max_frame = 8;
                this.max_frame_tick = 2;
                this.repeatable = false;
            }
        }
        else if (this.state === 'dead') {
            let r = Math.random();
            if (r < 0.5) {
                this.sprite_name = 'impy3';
                this.max_frame = 11;
                this.max_frame_tick = 100;
                this.repeatable = false;
            }
            else {
                this.sprite_name = 'impy3';
                this.max_frame = 11;
                this.max_frame_tick = 100;
                this.repeatable = false;
            }
        }
        else if (this.state === 'attack') {
            let r = Math.random();
            if (r < 0.5) {
                this.sprite_name = 'impy1';
                this.y_frame_offset = 240;
                this.max_frame = 6;
                this.max_frame_tick = 4;
                this.action_frame = 5;
            }
            else {
                this.sprite_name = 'impy1';
                this.y_frame_offset = 320;
                this.max_frame = 6;
                this.max_frame_tick = 4;
                this.action_frame = 5;
            }
        }
        else if (this.state === 'explode') {
            this.sprite_name = 'impy1';
            this.y_frame_offset = 160;
            this.max_frame = 4;
            this.max_frame_tick = 1;
        }
    }
}
