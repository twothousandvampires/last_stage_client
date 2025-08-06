import Sprite from "../Sprite";

export default class RocksFromCeil extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 12
        this.max_frame_tick = 3
        this.sprite_h = 150
        this.sprite_w = 50
        this.sprite_name = 'pack1'
        this.removable = true
       
        this.y_frame_offset = 340
    }
}