import Button from './button'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

export default class Vicory {

  constructor() {
    this.init()
  }

  init () {
    this.index = 0
    this.imageList = []
    for(let i=0; i< 21; i++) {
      var image = wx.createImage()
      image.src = `res/images/victory/${i}.png`
      this.imageList.push(image)
    }
    this.button = new Button('再来一局', [screenWidth/3, screenHeight*3/4], screenWidth/3)
  }

  play () {
    this.isPlaying = true
    this.__timer = setInterval(() => {
      this.index++
      if(this.index > 20) this.index = 0
    }, 150)
  }

  drawToCanvas (ctx) {
    let imgWidth = this.imageList[this.index].width
    let imgHeight = this.imageList[this.index].height
    let x = (screenWidth-imgWidth)/2
    let y = (screenHeight-imgHeight)/2
    ctx.drawImage(this.imageList[this.index], x, y)

    this.button.render(ctx)
  }

  stop() {
    this.isPlaying = false
    if ( this.__timer ) clearInterval(this[__.timer])
  }
}
