let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    // this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.timer      = null
    this.time       = '00:00'
    this.matrix     = [[], [], [], []]
    this.clearing   = [3, 3]
    this.animations = []
    this.gameStatus = 'READY' // 'STATED' 'SUCCESSED'
  }

  // 移动矩阵
  move (direction) {
    let clearing = this.clearing
    let targetXY = {
      UP:    [clearing[0]+1, clearing[1]],
      DOWN:  [clearing[0]-1, clearing[1]],
      LEFT:  [clearing[0], clearing[1]+1],
      RIGHT: [clearing[0], clearing[1]-1]
    }[direction]
    if(!(targetXY[0] > 3 || targetXY[0] < 0 || targetXY[1] > 3 || targetXY[1] < 0)) {
      let chunk = this.matrix[targetXY[0]][targetXY[1]]
      chunk.updateIndex(clearing)
      this.matrix[clearing[0]][clearing[1]] = chunk
      this.matrix[targetXY[0]][targetXY[1]] = null
      this.clearing = targetXY
      return true
    } else {
      return false
    }
  }

  disruptMatrix () {

  }

  // 游戏计时器
  timedCount (count=0) {
    count +=1
    this.timer = setTimeout(this.timedCount.bind(this, count), 1000)
    let min = parseInt(count/60) < 10 ? '0'+parseInt(count/60) : parseInt(count/60)
    let sec = count%60 < 10 ? '0' + count%60 : count%60
    this.time = `${min}:${sec}`
  }

  // 计时器清零
  resetTime () {
    clearTimeout(this.timer)
    this.time = '00:00'
  }
}
