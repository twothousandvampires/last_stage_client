import Sprite from "../Sprite";

export default class Tooth extends Sprite{
    state: number

    constructor(id: string){
        super(id)
        this.sprite_name = 'tooth'
        this.max_frame = 8
        this.max_frame_tick = 3
        this.sprite_h = 30
        this.sprite_w = 30
        this.state = 0
    }

    public update(data: any){
        this.x = data.x
        this.y = data.y
        this.flipped = data.flipped
        this.box_x = data.box_x
        this.box_y = data.box_y
        this.z = data.z
        this.state = data.state

        if(this.state === 0){
            this.y_frame_offset = 0
        }
        else if(this.state === 1){
            this.y_frame_offset = 30
        }
        else if(this.state === 2){
            this.y_frame_offset = 60
        }
    }
}