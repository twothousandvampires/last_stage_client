export default class Track{
    audio: any
    volume: number
    distance: number | undefined

    constructor(){
        this.audio = new Audio()
        this.volume = 0
        this.distance = 1000
    }

    setSrc(src: string){
        this.audio.src = 'sounds/' + src
        this.audio.load()
    }

    play(){
        if(this.volume === 0) return

        this.audio.volume = this.volume
        this.audio.play()
        this.audio.addEventListener('ended', () => {
            this.distance = 1000
            this.volume = 0
        })
    }

    stop(){
        this.distance = 1000
        this.audio.pause()
        this.audio.currentTime = 0
    }

    setVolume(max_value: number = 1){
        if(this?.distance > 35){
            this.volume = 0
        }
        else{
            let relate = 1 - (this.distance / 35)
            this.volume = max_value * relate
        }
    }
    setDistance(value = 1000){
        this.distance = value
    }
}