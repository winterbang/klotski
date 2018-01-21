import { fillRoundRect } from '../lib/index'
const screenWidth  = window.innerWidth

export default class Button {
  constructor(label, location=[0, 0], width, height, style={}) {
    this.label = label
    this.location = location
    this.width = width || screenWidth/3
    this.height = height || 45
    this.btnArea = {
      startX: location[0],
      startY: location[1],
      endX  : location[0]+this.width,
      endY  : location[1]+this.height
    }
  }

  render (ctx) {
    let { width, height, location} = this
    ctx.textBaseline = "middle"
    ctx.font = "28px serif"
    ctx.textAlign =  "center"
    ctx.fillStyle = 'white'
    fillRoundRect(ctx , location[0], location[1], width, height, 10, "#e29c66")
    ctx.fillText(this.label, location[0]+width/2, location[1]+height/2)
  }
}
