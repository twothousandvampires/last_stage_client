import Sprite from "../Sprite";

export default class StrangeLanguage extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 25
        this.sprite_h = 20
        this.sprite_w = 50
        this.sprite_name = 'pack5'
        this.removable = true
       
        this.y_frame_offset = 165
    }
}