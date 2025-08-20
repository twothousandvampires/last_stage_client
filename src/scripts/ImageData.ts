export default class ImageData{
    map: any
    static img_path = './img/'
    static list = [
        {
            name: 'cultist1',
            path:  'cultist/cultist1.png',
        },
        {
            name: 'cultist2',
            path:  'cultist/cultist2.png',
        },
        {
            name: 'swordman1',
            path:  'swordman/swordman1.png',
        },
        {
            name: 'swordman2',
            path:  'swordman/swordman2.png',
        },
        {
            name: 'swordman3',
            path:  'swordman/swordman3.png',
        },
        {
            name: 'flyer1',
            path:  'flyer/flyer1.png',
        },
        {
            name: 'flyer2',
            path:  'flyer/flyer2.png',
        },
        {
            name: 'flyer3',
            path:  'flyer/flyer3.png',
        },
        {
            name: 'impy1',
            path:  'impy/impy1.png',
        },
        {
            name: 'pile1',
            path:  'pile/pile1.png',
        },
        {
            name: 'frostspire',
            path:  'spire/spire.png',
        },
        {
            name: 'impy2',
            path:  'impy/impy2.png',
        },
        {
            name: 'impy3',
            path:  'impy/impy3.png',
        },
        {
            name: 'impy4',
            path:  'impy/impy4.png',
        },
        {
            name: 'flamy1',
            path:  'flamy/flamy1.png',
        },
        {
            name: 'flamy2',
            path:  'flamy/flamy2.png',
        },
        {
            name: 'flamy3',
            path:  'flamy/flamy3.png',
        },
        {
            name: 'flamy4',
            path:  'flamy/flamy4.png',
        },
        {
            name: 'fire_explosion',
            path:  'effect/fire_explosion.png',
        },
        {
            name: 'impy_fireball',
            path:  'proj/impy_fireball.png',
        },
        {
            name: 'solid1',
            path:  'solid/solid1.png',
        },
        {
            name: 'solid2',
            path:  'solid/solid2.png',
        },
        {
            name: 'solid3',
            path:  'solid/solid3.png',
        },
        {
            name: 'solid4',
            path:  'solid/solid4.png',
        },
        {
            name: 'big_frost_sphere',
            path:  'proj/big_frost_sphere.png',
        },
        {
            name: 'sharped_bone',
            path:  'proj/sharped_bone.png',
        },
        {
            name: 'medium_frost_sphere',
            path:  'proj/medium_frost_sphere.png',
        },
        {
            name: 'small_frost_sphere',
            path:  'proj/small_frost_sphere.png',
        },
        {
            name: 'pack1',
            path:  'effect/pack1.png',
        }, 
        {
            name: 'pack2',
            path:  'effect/pack2.png',
        }, 
         {
            name: 'pack3',
            path:  'effect/pack3.png',
        }, 
         {
            name: 'ghost_cultist',
            path:  'effect/ghost_cultist.png',
        }, 
         {
            name: 'pack4',
            path:  'effect/pack4.png',
        }, 
        {
            name: 'small_fireball',
            path:  'proj/small_fireball.png',
        }, 
        {
            name: 'big_fireball',
            path:  'proj/big_fireball.png',
        }, 
        {
            name: 'lightning',
            path:  'proj/lightning.png',
        }, 
        {
            name: 'bones1',
            path:  'bones/bones1.png',
        },
        {
            name: 'bones2',
            path:  'bones/bones2.png',
        },
        {
            name: 'bones3',
            path:  'bones/bones3.png',
        },
        {
            name: 'bones4',
            path:  'bones/bones4.png',
        },
        {
            name: 'bones5',
            path:  'bones/bones5.png',
        },
        {
            name: 'bones6',
            path:  'bones/bones6.png',
        },
        {
            name: 'skull1',
            path:  'skull/skull1.png',
        },
        {
            name: 'grace',
            path:  'effect/grace.png',
        },
        {
            name: 'fbones1',
            path:  'flying bones/fbones1.png',
        },
        {
            name: 'fbones2',
            path:  'flying bones/fbones2.png',
        },
        {
            name: 'fbones3',
            path:  'flying bones/fbones3.png',
        },
        {
            name: 'fbones4',
            path:  'flying bones/fbones4.png',
        },
        {
            name: 'fbones5',
            path:  'flying bones/fbones5.png',
        },
        {
            name: 'fbones6',
            path:  'flying bones/fbones6.png',
        },
        {
            name: 'tooth',
            path:  'proj/tooth.png',
        },
        {
            name: 'weapon fragment',
            path:  'proj/weapon fragment.png',
        },
        {
            name: 'specter1',
            path:  'spectre/spectre1.png',
        },
        {
            name: 'specter2',
            path:  'spectre/spectre2.png',
        },
        {
            name: 'specter3',
            path:  'spectre/spectre3.png',
        },
        {
            name: 'specter4',
            path:  'spectre/spectre4.png',
        },
        {
            name: 'projectiles1',
            path:  'proj/projectiles1.png',
        },
        {
            name: 'gifter1',
            path: 'Gifter/gifter1.png',
        },
        {
            name: 'boss1',
            path: 'boss/boss1.png',
        },
        {
            name: 'statue1',
            path: 'spirit_statue/spirit_statue1.png',
        },
    ]

    constructor(){
        this.map = new Map()
        this.load()
    }

    private load(){
        ImageData.list.forEach(elem => {
            let img = new Image()
            img.src = ImageData.img_path + elem.path
            this.map.set(elem.name, img)
        })
    }
}