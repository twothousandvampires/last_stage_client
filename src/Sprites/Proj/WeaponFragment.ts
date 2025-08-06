import Sprite from "../Sprite";
export default class WeaponFragment extends Sprite {
   
    constructor(id) {
        super(id);
        this.sprite_name = 'weapon fragment';
        this.max_frame = 1;
        this.max_frame_tick = 1000;
        this.sprite_h = 25;
        this.sprite_w = 25;
        this.setY()
    }

    setY(){
        let r = Math.random()
        if(r < 0.25){
            this.y_frame_offset = 0
        }
        else if(r < 0.5){
            this.y_frame_offset = 25
        }
        else if(r < 0.75){
            this.y_frame_offset = 50
        }
        else{
            this.y_frame_offset = 75
        }
    }   
}
