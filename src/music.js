let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    // this.bgmAudio = new Audio()
    // this.bgmAudio.loop = true
    // this.bgmAudio.src  = 'audio/bgm.mp3'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.mp3'

    this.boomAudio     = new Audio()
    // this.boomAudio.src = 'res/audios/boom.mp3'
    this.boomAudio.src = 'res/audios/move.mp3'

    this.victoryAudio      = new Audio()
    this.victoryAudio.loop = true
    this.victoryAudio.src  = 'res/audios/victory.mp3'

    this.playBgm()
  }

  playBgm() {
    // this.bgmAudio.play()
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playCrash() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }

  playVictory() {
    this.victoryAudio.play()
  }
}
