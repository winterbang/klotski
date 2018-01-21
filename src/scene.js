import { fillRoundRect, star5 } from '../lib/index'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const Margin  = 10
const Padding = 10
const Width = (screenWidth-Padding*2-Margin*2) / 4
const PaddingTop = (screenHeight-Width*4)/2
const BACKGROUND_COLOR = '#fbf8f0'

export default class Scene {

  render(ctx, time) {
    // 画背景
    // var image = wx.createImage()
    // image.src = 'res/images/bg4.jpg'
    // ctx.drawImage(image, 0, 0, screenWidth, screenHeight)
    // ctx.fillStyle = '#dcd2b8'
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, screenWidth, screenHeight)

    // 展示按钮，文字，时间等附加项
    ctx.fillStyle = '#766e66'
    ctx.font = "38px serif"
    ctx.textBaseline = "bottom"
    ctx.textAlign =  "center"
    ctx.fillText('华容道', screenWidth/2, PaddingTop-70)
    ctx.fillText(time, screenWidth/2, PaddingTop-20)
    // 画数字面板
    fillRoundRect(ctx, Margin, PaddingTop-10, screenWidth-Margin*2, Width*4+20, 10, "#bbaba0")

    // ctx.fillStyle = '#766e66'
    // ctx.fillRect(10, PaddingTop+Width, screenWidth-20, 10)

    for (let i=1; i <= 16; i++) {
      let index = [parseInt((i - 1) / 4), (i - 1) % 4]
      let x = index[1] * Width + Padding*1.5 + Margin
      let y = index[0] * Width + PaddingTop+Padding/2
      fillRoundRect(ctx, x, y, Width-Padding, Width-Padding, 10, "#cbc0b5")
    }

  }
}
