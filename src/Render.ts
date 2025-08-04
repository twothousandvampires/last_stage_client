import ImageData from "./ImageData.js"
import Armour from "./Sprites/Effect/Armour.js"
import AttackingGhostCultist from "./Sprites/Effect/AttackingGhostCultist.js"
import BannerOfArmour from "./Sprites/Effect/BannerOfArmour.js"
import BigFrostnova from "./Sprites/Effect/BigFrostnova.js"
import BigShocknova from "./Sprites/Effect/BigShocknova.js"
import Blood from "./Sprites/Effect/blood.js"
import BloodShard from "./Sprites/Effect/BloodShard.js"
import BloodSphere from "./Sprites/Effect/BloodSphere.js"
import BoneArmour from "./Sprites/Effect/BoneArmour.js"
import BoneExplosion from "./Sprites/Effect/BoneExplosion.js"
import ChargedSphere from "./Sprites/Effect/ChargedSphere.js"
import Curse from "./Sprites/Effect/Curse.js"
import CurseArea from "./Sprites/Effect/CurseArea.js"
import fireExplosion from "./Sprites/Effect/FireExplosion.js"
import FireExplosionMedium from "./Sprites/Effect/FireExplosionMedium.js"
import FireExplosionSmall from "./Sprites/Effect/FireExplosionSmall.js"
import Flame from "./Sprites/Effect/Flame.js"
import FrostExplosionBig from "./Sprites/Effect/FrostExplosionBig.js"
import FrostExplosionMedium from "./Sprites/Effect/FrostExplosionMedium.js"
import FrostNova from "./Sprites/Effect/FrostNova.js"
import GhostGrip from "./Sprites/Effect/GhostGrip.js"
import GhostGripArea from "./Sprites/Effect/GhostGripArea.js"
import Grace from "./Sprites/Effect/Grace.js"
import GraceShard from "./Sprites/Effect/GraceShard.js"
import GroundHit from "./Sprites/Effect/GroundHit.js"
import Intervention from "./Sprites/Effect/Intervention.js"
import LightningBolt from "./Sprites/Effect/LightningBolt.js"
import Quake from "./Sprites/Effect/Quake.js"
import RocksFromCeil from "./Sprites/Effect/RocksFromCeil.js"
import Rune from "./Sprites/Effect/Rune.js"
import RuneExplode from "./Sprites/Effect/RuneExplode.js"
import SharpedBone from "./Sprites/Effect/SharpedBone.js"
import SmallShockNova from "./Sprites/Effect/SmallShockNova.js"
import SpecterVortex from "./Sprites/Effect/SpecterVortex.js"
import SplitOfEntity from "./Sprites/Effect/SplitOfEntity.js"
import Star from "./Sprites/Effect/Star.js"
import StaticField from "./Sprites/Effect/StaticField.js"
import Teacher from "./Sprites/Effect/Teacher.js"
import ToothExplode from "./Sprites/Effect/ToothExplode.js"
import WalkingGhostCultist from "./Sprites/Effect/WalkingGhostCultist.js"
import Bones from "./Sprites/Enemy/Bones.js"
import FlamySprite from "./Sprites/Enemy/FlamySprite.js"
import FlyingBones from "./Sprites/Enemy/FlyingBones.js"
import FrostSpire from "./Sprites/Enemy/FrostSpire.js"
import Gifter from "./Sprites/Enemy/Gifter.js"
import ImpySprite from "./Sprites/Enemy/ImpySprite.js"
import Pile from "./Sprites/Enemy/Pile.js"
import Skull from "./Sprites/Enemy/Skull.js"
import Solid from "./Sprites/Enemy/Solid.js"
import Spectre from "./Sprites/Enemy/Spectre.js"
import Cultist from "./Sprites/Player/Cultist.js"
import FlyerSprite from "./Sprites/Player/FlyerSprite.js"
import PlayerSprite from "./Sprites/Player/PlayerSprite.js"
import BigFrostSphere from "./Sprites/Proj/BigFrostSphere.js"
import Fireball from "./Sprites/Proj/Fireball.js"
import FlamyFireball from "./Sprites/Proj/FlamyFireball.js"
import Lightning from "./Sprites/Proj/Lightning.js"
import SpecterSoulSeeker from "./Sprites/Proj/SpecterSoulSeeker.js"
import ThrowedWeapon from "./Sprites/Proj/ThrowedWeapon.js"
import Tooth from "./Sprites/Proj/Tooth.js"
import WeaponFragment from "./Sprites/Proj/WeaponFragment.js"

export default class Render{
    ctx: any
    canvas_scale: number
    player_img: any
    client_id: string
    actors: any
    light: boolean[][]
    data: ImageData
    bg: any
    bg_bottom: any
    socket: any
    downscale: number

    constructor(socket: any){
        this.client_id = socket.id
        this.socket = socket
        this.canvas_scale = 5
        this.actors = new Map()
        this.light = []
        this.downscale = 5
        this.data = new ImageData()
        this.init()
    }

    getPlayerSprite(){
        return this.actors.get(this.client_id)
    }

    init(){
        this.ctx = document.getElementById('canvas').getContext('2d')
        this.ctx.scale(this.canvas_scale, this.canvas_scale)
        this.ctx.imageSmoothingEnabled  = false

        let bg_img = new Image()
        bg_img.src = './img/bg/bg.png'
        this.bg = bg_img

        let bg_botton = new Image()
        bg_botton.src = './img/bg/bg_bottom.png'
        this.bg_bottom = bg_botton

        this.initLightMap()
    }

    initLightMap() {
        for (let i = 0; i < 120; i++) {
            this.light[i] = []
            for (let j = 0; j < 120; j++) {
                this.light[i][j] = false
            }
        }
    }


    getLifeString(life: number): string{
        if(life > 3){
            return 'blessed'
        }
        else if(life == 3){
            return 'good'
        }
        else if(life == 2){
            return 'injured'
        }
        else if(life == 1){
            return 'near death'
        }
        else{
            return 'death'
        }
    }

    drawSwordmanUI(sprite: PlayerSprite){
        
        let resourses = document.getElementById('player_resourses')
        let life = document.getElementById('player_life')

        resourses.innerText = sprite.resource + ' / ' + sprite.max_resource + ' / ' + sprite.second
        life.innerText = this.getLifeString(sprite.life_status)

        let first = document.getElementById('first')

        if(sprite.first){
            first.className = ''
        }
        else{
            first.className = 'cannot_use'
        }

        let secondary = document.getElementById('secondary')
        if(sprite.secondary){
            secondary.classList = ''
        }
        else{
            secondary.classList = 'cannot_use'  
        }

        let finisher = document.getElementById('finisher')
        if(sprite.finisher){
            finisher.classList = ''
        }
        else{
            finisher.classList = 'cannot_use'  
        }

        let utility = document.getElementById('utility')
        if(sprite.utility){
            utility.classList = ''  
        }
        else{
            utility.classList = 'cannot_use'  
        }
    }

    getSprite(elem: any){
        if(elem.name === 'swordman'){
            let sprite = new PlayerSprite(elem.id)
            return sprite
        }
        else if(elem.name === 'flyer'){
            let sprite = new FlyerSprite(elem.id) 
            return sprite
        }
        else if(elem.name === 'cultist'){
            let sprite = new Cultist(elem.id)
            return sprite
        }
        else if(elem.name === 'impy'){
            return new ImpySprite(elem.id)
        }
        else if(elem.name === 'bones'){
            return new Bones(elem.id)
        }
        else if(elem.name === 'flamy'){
            return new FlamySprite(elem.id)
        }
        else if(elem.name === 'split'){
            return new SplitOfEntity(elem.id)
        }
        else if(elem.name === 'grace shard'){
            return new GraceShard(elem.id)
        }
        else if(elem.name === 'solid'){
            return new Solid(elem.id)
        }
        else if(elem.name === 'skull'){
            return new Skull(elem.id)
        }
        else if(elem.name === 'flamy_fireball'){
            return new FlamyFireball(elem.id)
        }
        else if(elem.name === 'grace'){
            return new Grace(elem.id)
        }
        else if(elem.name === 'fire_explosion'){
            return new fireExplosion(elem.id)
        }
        else if(elem.name === 'armour'){
            return new Armour(elem.id)
        }
        else if(elem.name === 'throwed_weapon'){
            return new ThrowedWeapon(elem.id)
        }
        else if(elem.name === 'quake'){
            return new Quake(elem.id)
        }
        else if(elem.name === 'frostnova'){
            return new FrostNova(elem.id)
        }
        else if(elem.name === 'bone armour'){
            return new BoneArmour(elem.id)
        }
        else if(elem.name === 'bone explosion'){
            return new BoneExplosion(elem.id)
        }
        else if(elem.name === 'big frost sphere'){
            return new BigFrostSphere(elem.id)
        } 
        else if(elem.name === 'frost explosion big'){
            return new FrostExplosionBig(elem.id)
        }
        else if(elem.name === 'frost explosion medium'){
            return new FrostExplosionMedium(elem.id)
        }
        else if(elem.name === 'fire_explosion_medium'){
            return new FireExplosionMedium(elem.id)
        }
        else if(elem.name === 'fire_explosion_small'){
            return new FireExplosionSmall(elem.id)
        }
        else if(elem.name === 'fireball'){
            return new Fireball(elem.id)
        }
        else if(elem.name === 'lightning'){
            return new Lightning(elem.id)
        }
        else if(elem.name === 'flame'){
            return new Flame(elem.id)
        }
        else if(elem.name === 'big frostnova'){
            return new BigFrostnova(elem.id)
        }
        else if(elem.name === 'lightning bolt'){
            return new LightningBolt(elem.id)
        }
        else if(elem.name === 'rocks from ceil'){
            return new RocksFromCeil(elem.id)
        }
        else if(elem.name === 'charged sphere'){
            return new ChargedSphere(elem.id)
        }
        else if(elem.name === 'ground hit'){
            return new GroundHit(elem.id)
        }
        else if(elem.name === 'blood'){
            return new Blood(elem.id)
        }
        else if(elem.name === 'big shocknova'){
            return new BigShocknova(elem.id)
        }
        else if(elem.name === 'teacher'){
            return new Teacher(elem.id)
        }
        else if(elem.name === 'blood sphere'){
            return new BloodSphere(elem.id)
        }
        else if(elem.name === 'blood shard'){
            return new BloodShard(elem.id)
        }
        else if(elem.name === 'star'){
            return new Star(elem.id)
        }
        else if(elem.name === 'flying bones'){
            return new FlyingBones(elem.id)
        }
        else if(elem.name === 'sharped bone'){
            return new SharpedBone(elem.id)
        }
        else if(elem.name === 'ghost grip area'){
            return new GhostGripArea(elem.id)
        }
        else if(elem.name === 'ghost grip'){
            return new GhostGrip(elem.id)
        }
        else if(elem.name === 'curse of damned'){
            return new Curse(elem.id)
        }
        else if(elem.name === 'curse area'){
            return new CurseArea(elem.id)
        }
        else if(elem.name === 'tooth'){
            return new Tooth(elem.id)
        }
        else if(elem.name === 'tooth explode'){
            return new ToothExplode(elem.id)
        }
        else if(elem.name === 'weapon fragment'){
            return new WeaponFragment(elem.id)
        }
        else if(elem.name === 'specter'){
            return new Spectre(elem.id)
        }
        else if(elem.name === 'specter vortex'){
            return new SpecterVortex(elem.id)
        }
        else if(elem.name === 'specter soul seeker'){
            return new SpecterSoulSeeker(elem.id)
        }
        else if(elem.name === 'rune'){
            return new Rune(elem.id)
        }
        else if(elem.name === 'rune explode'){
            return new RuneExplode(elem.id)
        }
        else if(elem.name === 'pile'){
            return new Pile(elem.id)
        }
        else if(elem.name === 'walking ghost cultist'){
            return new WalkingGhostCultist(elem.id)
        }
        else if(elem.name === 'attacking ghost cultist'){
            return new AttackingGhostCultist(elem.id)
        }
        else if(elem.name === 'banner of armour'){
            return new BannerOfArmour(elem.id)
        }
        else if(elem.name === 'small shocknova'){
            return new SmallShockNova(elem.id)
        }
        else if(elem.name === 'frost spire'){
            return new FrostSpire(elem.id)
        }
        else if(elem.name === 'static field'){
            return new StaticField(elem.id)
        }
        else if(elem.name === 'intervention'){
            return new Intervention(elem.id)
        }
        else if(elem.name === 'gifter'){
            return new Gifter(elem.id)
        }
    }

    public updateData(data: any){
        
        data.deleted.forEach(id => {
            this.actors.delete(id)
        })

        data.actors.forEach(elem => {
            let sprite = this.actors.get(elem.id)

            if(!sprite){
                sprite = this.getSprite(elem)
            
                if(sprite){
                    sprite.update(elem)
                    this.actors.set(elem.id, sprite)
                }
            }
            else{
                sprite.update(elem)
            }
        })
    }

    private flipHorizontally(around){
        this.ctx.translate(around , 0)
        this.ctx.scale(-1, 1);
        this.ctx.translate(-around, 0)
    }
    drawLight(){
        this.ctx.fillStyle = 'black'
        for(let i = 0; i < 120; i++){
            for(let j = 0; j < 120; j++){
                if(!this.light[i][j]){
                    this.ctx.fillRect(j, i, 1 ,1)
                }
                else{
                    this.light[i][j] = false
                }
            }
        }
    }
    draw(inputs: any){
        let client = this.actors.get(this.client_id)
        
        if(!client) return

        this.drawSwordmanUI(client)

        let rel_x = client.x
        let rel_y = client.y

        rel_x = (40 + client.level_id * 120 ) - rel_x
        rel_y = 40 - rel_y
        
    
        this.ctx.clearRect(0, 0, 120, 120)

        this.ctx.drawImage(this.bg, 120 * client.level_id, 0, 120, 120, rel_x, rel_y, 120, 120)

        let to_draw = Array.from(this.actors.values())

        to_draw.sort((a, b) => {if ( a.is_bottom && !b.is_bottom ){
            return -1
        }
        else{
            return  ((a.y + a.z) - (b.y + b.z))
        }
        })
        let t = undefined
        for(let i = 0; i < to_draw.length; i++){

            let elem = to_draw[i]

            if(elem.need_to_remove){
                this.actors.delete(elem.id)
                continue
            }

            let rel_x = client.x - elem.x
            let rel_y = client.y - elem.y

            rel_x = 40 - rel_x
            rel_y = 40 - rel_y
            
            if(elem.flipped){
                this.ctx.save()
                this.flipHorizontally(rel_x)
            }
            
            if(elem.by_centr){
                this.ctx.drawImage(this.data.map.get(elem.sprite_name),
                elem.frame * elem.sprite_w,
                elem.y_frame_offset + 1,
                elem.sprite_w,
                elem.sprite_h - 1,
                rel_x - elem.sprite_w / (2 * this.downscale), 
                rel_y - (elem.sprite_h / (2 * this.downscale)) - elem.z,
                elem.sprite_w / this.downscale, 
                elem.sprite_h / this.downscale)
            }
            else{
                this.ctx.drawImage(this.data.map.get(elem.sprite_name),
                elem.frame * elem.sprite_w,
                elem.y_frame_offset + 1,
                elem.sprite_w,
                elem.sprite_h - 1,
                rel_x - elem.sprite_w / (2 * this.downscale), 
                rel_y - ( (elem.sprite_h / this.downscale) - 1) - elem.z,
                elem.sprite_w / this.downscale, 
                elem.sprite_h / this.downscale)
            }

            if(elem.flipped){
                this.ctx.restore()
            }

            // this.ctx.fillStyle = 'white'
            // this.ctx.fillRect(rel_x, rel_y, 1, 1)
            // this.ctx.fillStyle = 'green'
            // this.ctx.beginPath();
            // this.ctx.ellipse(rel_x, rel_y, 2.5, 1.25, 6.28, 0, 360)
            // this.ctx.fill()
            
            // this.ctx.fillRect(rel_x - value.box_x / 2, rel_y - Math.ceil(value.box_y/ 2), value.box_x, value.box_y)
        
            elem.act()

            if(!elem.action && elem.is_action_frame){
                elem.action = true
                this.socket.emit('action', elem.id) 
            }
            
            if(elem.real_x && elem.real_y && inputs.l_click){
                if(inputs.canvas_x >= rel_x - elem.real_x/2 && inputs.canvas_x <= rel_x + elem.real_x / 2 &&
                    inputs.canvas_y >= rel_y - elem.real_y && inputs.canvas_y <= rel_y
                ){
                    t = elem.id
                }
            }

            // this.ctx.font = "2px serif";
            // this.ctx.fillStyle  = 'white'
            // this.ctx.fillText(elem.state, rel_x, rel_y)

            if((elem.id === this.client_id) || (elem.light_r && elem.can_share_light)){
                let r = elem.light_r
                for (let i = -r; i <= r; i += 1) {
                    for (let j = -r; j <= r; j += 1) {
                        let y = i + Math.floor(rel_y - elem.z - elem.light_z) 
                        let x = j + Math.floor(rel_x)
                
                        if(y < 0 || x < 0 || x >= 120 || y >= 120) continue
                
                        let diff = Math.round(Math.sqrt(i * i + j * j))
                        if (diff <= r){
                            this.light[y][x] = true
                        }
                    }
                }
            }
        }
        if(t){
            this.socket.emit('set_target', t) 
        }
        this.drawLight()
        this.ctx.drawImage(this.bg_bottom, 0, 0, 120, 120, rel_x, rel_y, 120, 120) 
    }
}