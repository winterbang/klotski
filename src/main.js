import DataBus from './databus'
import Chunk from './chunk'
import Button from './button'
import Music from './music'
import Vicory from './victory'
import Scene from './scene'
import { fillRoundRect } from '../lib/index'

let ctx = canvas.getContext('2d')
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const Padding = 10
const Width = (window.innerWidth-Padding*2) / 4
const PaddingTop = (window.innerHeight-Width*4)/2

let databus = new DataBus()
let victory = new Vicory()
let scene = new Scene()
let MaxNum = 15

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Main {
  constructor() {
    this.restart()
    this.touchStart = []
    this.music  = new Music()
    this.generateMatrix
    this.btnReset = new Button('重组',[screenWidth/12, screenHeight-PaddingTop+40])
    this.btnStart = new Button('开始',[screenWidth*7/12, screenHeight-PaddingTop+40])
  }

  init() {

  }

  restart() {

    this.generateMatrix()

    wx.onTouchStart((e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      this.touchStart = [x, y]
      let btnStartArea = this.btnStart.btnArea
      let btnResetArea = this.btnReset.btnArea
      let btnVictoryArea = victory.button.btnArea
      if( x >= btnVictoryArea.startX
         && x <= btnVictoryArea.endX
         && y >= btnVictoryArea.startY
         && y <= btnVictoryArea.endY ) {
           databus.resetTime()
           databus.gameStatus = 'STARTED'
           this.generateMatrix()
      } else if ( x >= btnStartArea.startX
         && x <= btnStartArea.endX
         && y >= btnStartArea.startY
         && y <= btnStartArea.endY ) {
         databus.timedCount()
         databus.gameStatus = 'STARTED'

       } else if ( x >= btnResetArea.startX
          && x <= btnResetArea.endX
          && y >= btnResetArea.startY
          && y <= btnResetArea.endY ) {
          databus.resetTime()
          // databus.disruptMatrix()
          this.generateMatrix()
       }
    })

    wx.onTouchEnd((e) => {
      if (this.touchStart[1] > PaddingTop && this.touchStart[1] < PaddingTop+Width*4 && databus.gameStatus == 'STARTED') {
        this.chunkMoveHandler(e)
      }
    })

    // this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )

  }

  generateMatrix() {
    let indexSample = [...Array(MaxNum)].map((v,k) => k+1)
    let disorderArray = indexSample.sort(function(i) {
      return 0.5 - Math.random()
    })
    databus.reset()
    for (let i=1; i <= MaxNum; i++) {
      let matrixIndex = [parseInt((i - 1) / 4), (i - 1) % 4]
      // let num = indexSample.splice(rnd(0, indexSample.length), 1)[0]
      let num = disorderArray[i-1]
      // let chunk = new Chunk(num, matrixIndex, `res/images/${num > 9 ? num : '0'+num}.png`)
      let chunk = new Chunk(num, matrixIndex, `res/images/${'o'+num}.png`)
      databus.matrix[matrixIndex[0]][matrixIndex[1]] = chunk
    }
  }

  chunkMoveHandler(e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let direction = this.moveDirection(this.touchStart, [x, y])
    if(databus.move(direction)) {
      this.music.playCrash()
    }
  }

  moveDirection (startXY, endXY) {
    let horizontal = endXY[0] - startXY[0]
    let vertical = endXY[1] - startXY[1]
    if(Math.abs(horizontal) > Math.abs(vertical)) {
      if(horizontal > 0) return 'RIGHT'
      return 'LEFT'
    } else {
      if(vertical > 0) return 'DOWN'
      return 'UP'
    }
  }

  monitorAchieve () {
    databus.matrix.every((row, i) => {
      let status
      row.every((chunk, j) => {
        if(chunk) {
          if(i == 3 && j == 2) {
            databus.gameStatus = 'SUCCESSED'
            return false
          } else {
            return status = chunk.isAtHome()
          }

        }
      })
      return status
    })
  }

  render () {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 画背景
    scene.render(ctx, databus.time)

    // 画数字块
    databus.matrix.forEach((row, idx) => {
      row.forEach((chunk, idx) => {
        if(chunk) chunk.drawToCanvas(ctx)
      })
    })

    if ( (databus.gameStatus == 'SUCCESSED') ) {
      if (!victory.isPlaying) victory.play()
      victory.drawToCanvas(ctx)
      this.music.playVictory()
    } else {
      this.btnReset.render(ctx)
      this.btnStart.render(ctx)
    }
  }

  loop () {
    this.monitorAchieve()
    this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}
