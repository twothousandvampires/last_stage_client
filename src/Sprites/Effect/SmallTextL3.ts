import Sprite from "../Sprite";

export default class SmallTextL3 extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 25
        this.sprite_h = 20
        this.sprite_w = 50
        this.sprite_name = 'pack5'
        this.removable = true
       
        this.y_frame_offset = 40
        this.set()
    }

    set(){
        let r = Math.random()
        if(r < 0.33){

        }
        else if(r < 0.66){
            this.frame = 1
            this.max_frame = 2
            this.max_frame_tick = 22
        }
        else{
            this.frame = 2
            this.max_frame = 3
            this.max_frame_tick = 30
        }
    }
}