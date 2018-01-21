import { fillRoundRect, strokeRoundRect } from '../lib/index'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const Margin  = 10
const Padding = 10
const Width = (screenWidth-Padding*2-Margin*2) / 4
const PaddingTop = (screenHeight-Width*4)/2

// 块
export default class Chunk {
  constructor(num, index) {
    this.num = num
    this.width = Width

    this.stepX = Width
    this.stepY = Width
    // this.image = new Image()
    // this.image.src = src
    // this.home = [parseInt((num - 1) / 4), (num - 1) % 4]

    this.updateIndex(index)
  }

  drawToCanvas (ctx) {
    let {x, y, index, width} = this

    // ctx.fillStyle = '#cac0b4'
    // ctx.fillRect(x, y, Width, Width)
    // fillRoundRect(ctx , x, y, Width, Width, 10, "#ccc0b3")
    fillRoundRect(ctx , x, y, Width-Padding, Width-Padding, 10, "#ebe0cb")
    // strokeRoundRect(ctx , x, y, Width, Width, 10, 8, "#bbaba0")

    ctx.textBaseline = "middle"
    ctx.font = `${width-40}px serif`
    ctx.textAlign =  "center"
    ctx.fillStyle = '#756e64'
    ctx.fillText(this.num, this.x+(Width-Padding)/2, this.y+(Width-Padding)/2)
  }

  // 检查当前块是不是在它应该在的位置
  isAtHome () {
    let { num, index } = this
    let homeIndex = [parseInt((num - 1) / 4), (num - 1) % 4]
    return homeIndex.join() == index.join()
  }

  // 更新当前块的坐标
  updateIndex (index){
    this.index = index
    this.x = index[1] * Width + Padding*1.5 + Margin
    this.y = index[0] * Width + PaddingTop+Padding/2
  }
}
