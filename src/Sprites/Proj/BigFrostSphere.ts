import Sprite from "../Sprite";

export default class BigFrostSphere extends Sprite{
    name: string
    constructor(id: string){
        super(id)
        this.sprite_name = 'big_frost_sphere'
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
        if(this.name === 'big frost sphere'){
            this.sprite_name = 'big_frost_sphere'
        }
        else if(this.name === 'medium frost sphere'){
            this.sprite_name = 'medium_frost_sphere'
        }
        else if(this.name === 'small frost sphere'){
            this.sprite_name = 'small_frost_sphere'
        }
    }
}