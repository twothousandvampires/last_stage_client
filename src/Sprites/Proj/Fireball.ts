import Sprite from "../Sprite";

export default class Fireball extends Sprite{
    name: string
    constructor(id: string){
        super(id)
        this.sprite_name = 'big_fireball'
        this.max_frame = 5
        this.max_frame_tick = 4
        this.sprite_h = 30
        this.sprite_w = 30
    }

    public update(data: any){
        this.x = data.x
        this.y = data.y
        this.flipped = data.flipped
        this.box_x = data.box_x
        this.box_y = data.box_y
        this.z = data.z
        this.name = data.name
        if(this.name === 'fireball'){
            this.sprite_name = 'big_fireball'
        }
        else if(this.name === 'medium fireball'){
            this.sprite_name = 'impy_fireball'
        }
        else if(this.name === 'small fireball'){
            this.sprite_name = 'small_fireball'
        }
    }
}