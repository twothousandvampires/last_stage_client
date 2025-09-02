import Sprite from "../Sprite";

export default class TextLanguage3 extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 45
        this.sprite_h = 35
        this.sprite_w = 100
        this.sprite_name = 'pack5'
        this.removable = true
       
        this.y_frame_offset = 130
        this.set()
    }

    set(){
        let r = Math.random()
        if(r < 0.5){

        }
        else{
            this.frame = 1
            this.max_frame = 2
            this.max_frame_tick = 40
        }
    }
}