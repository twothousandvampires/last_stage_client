import Sprite from "../Sprite";

export default class WalkingGhostCultist extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 6
        this.sprite_h = 80
        this.sprite_w = 80
        this.sprite_name = 'ghost_cultist'
        this.y_frame_offset = 160
    }
}