import Sprite from "../Sprite";

export default class Star extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 1;
        this.max_frame_tick = 10000;
        this.sprite_h = 25;
        this.sprite_w = 25;
        this.sprite_name = 'pack3';
        this.y_frame_offset = Math.random() > 0.5 ? 80 : 105;
        this.frame = Math.floor(Math.random() * 5)
    }

    public act(){
        
    }
}