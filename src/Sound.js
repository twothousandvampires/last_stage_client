import Track from "./Track.js";
class Sound {
    pool;
    back;
    constructor() {
        this.pool = [new Track(), new Track(), new Track(), new Track()];
        this.back = new Audio();
        this.back.src = 'sounds/99_Cavern_of_Lost_Souls.mp3';
        this.back.volume = 0.2;
    }
    static distance(x, y, x1, y1) {
        return Math.round(Math.sqrt(((x - x1) ** 2) + ((y - y1) ** 2)));
    }
    updateData(server_data, player) {
        server_data.sounds.sort((a, b) => Sound.distance(b.x, b.y, player.x, player.y) - Sound.distance(a.x, a.y, player.x, player.y));
        let sounds = server_data.sounds.slice(0, 3);
        sounds.forEach(elem => {
            let d = Sound.distance(elem.x, elem.y, player.x, player.y);
            this.setSound(elem.name, d);
        });
    }
    setSound(name, distance = 0) {
        let track = this.pool[3];
        if (distance < track.distance) {
            let info = this.getSrcByName(name);
            track.stop();
            track.setDistance(distance);
            track.setSrc(info.src);
            track.setVolume(info.max_volume);
            track.play();
            this.sortPool();
        }
    }
    getSrcByName(name) {
        let result = {
            max_volume: 1,
            src: ''
        };
        if (name === 'lightning bolt') {
            let v = ['lning1.wav', 'ltning.wav', 'storm.wav', 'cbolt.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.6;
        }
        else if (name === 'demon roar') {
            let v = ['attack1.wav', 'attack3.wav', 'attack2.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'impy') {
            result.src = 'impy.wav';
        }
        else if (name === 'shatter') {
            result.src = 'shatter1.wav';
        }
        else if (name === 'frost nova') {
            result.src = 'cold3.wav';
        }
        else if (name === 'sword hit') {
            let v = ['sword1.wav', 'sword2.wav', 'sword3.wav', 'sword4.wav', 'sword5.wav', 'sword6.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'metal hit') {
            let v = ['block arrow1.wav', 'block arrow2.wav', 'block arrow3.wav', 'block blade1.wav', 'block blade4.wav', 'block blade5.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'fire explosion') {
            let v = ['explosionlarge2.wav', 'explosionlarge4.wav', 'explosionlarge5.wav', 'explosionmed1.wav', 'explosionmed2.wav', 'explosionmed3.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.4;
        }
        else if (name === 'fire cast') {
            let v = ['firecast.wav', 'firelaunch1.wav', 'firelaunch2.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'cold cast') {
            let v = ['coldcast.wav', 'icebolt2.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'ground hit') {
            let v = ['blunt1.wav', 'blunt2.wav', 'blunt3.wav', 'blunt4.wav', 'blunt5.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'fire massive') {
            let v = ['diabloseal.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'lightning cast') {
            let v = ['eleccast.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'cast') {
            let v = ['summon.wav', 'firecasta.wav', 'cloak.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'holy cast') {
            let v = ['holybolt1.wav', 'holybolt2.wav', 'holybolt3.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'dark cast') {
            let v = ['cursecast.wav', 'revivecast.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'sword swing') {
            let v = ['bigswish1.wav', 'bigswish2.wav', 'bigswish3.wav', 'bigswish5.wav', 'bigswish4.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.1;
        }
        else if (name === 'corpse explode') {
            let v = ['corpse explode 1.wav', 'corpse explode 2.wav', 'corpse explode 3.wav', 'corpse explode 4.wav', 'corpse explode 5.wav', 'corpse explode 6.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.3;
        }
        else if (name === 'menu button') {
            result.src = 'button.wav';
            result.max_volume = 1;
        }
        else if (name === 'menu button 2') {
            result.src = 'pointdrop.wav';
            result.max_volume = 1;
        }
        else if (name === 'menu item take') {
            result.src = 'belt.wav';
            result.max_volume = 0.3;
        }
        else if (name === 'menu item drop') {
            result.src = 'glovesmetal.wav';
            result.max_volume = 0.3;
        }
        else if (name === 'taunt') {
            let v = ['taunt1.wav', 'taunt2.wav', 'taunt3.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'zap') {
            let v = ['zap1.wav', 'zap2.wav', 'zap3.wav', 'zap4.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'static') {
            let v = ['static1.wav', 'static2.wav', 'static3.wav', 'static4.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.3;
        }
        else if (name === 'hit bones') {
            let v = ['gethit1.wav', 'gethit2.wav', 'gethit3.wav', 'gethit4.wav', 'gethit5.wav', 'gethit6.wav', 'gethit7.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.3;
        }
        else if (name === 'bones explode') {
            let v = ['death1.wav', 'death2.wav', 'death3.wav', 'death4.wav', 'death5.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.3;
        }
        else if (name === 'short sword swing') {
            let v = ['defiles1.wav', 'defiles2.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'not deserving') {
            result.src = 'not_deserving.wav';
            result.max_volume = 0.6;
        }
        else if (name === 'specter attack') {
            let v = ['s_attack1.wav', 's_attack2.wav', 's_attack3.wav', 's_attack4.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.6;
        }
        else if (name === 'blow') {
            let v = ['blow1.wav', 'blow2.wav', 'blow3.wav', 'blow4.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        else if (name === 'injured human') {
            let v = ['soft1.wav', 'soft3.wav', 'soft5.wav'];
            result.src = v[Math.floor(Math.random() * v.length)];
            result.max_volume = 0.2;
        }
        return result;
    }
    sortPool() {
        this.pool.sort((a, b) => a.distance - b.distance);
    }
}
const instance = new Sound();
export default instance;
