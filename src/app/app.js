import * as Head from './header.js'
import { Ajax } from './module/sample/ajax.js'
import { SimpleGoogleSpreadsheet } from './common/simple-google-spreadsheet.js'
import { DrawSS } from './module/sample/draw-ss.js'

export class App {
  constructor () {
    this.running = false
  }

  /**
   * 初期化処理
   */
  init () {
    if (this.running === true) {
      console.log('cancel')
      return
    }
    this.running = true
  }

  /**
   * 終了処理
   */
  fix () {
    this.running = false
  }


  test () {
    this.init()
    const ajax = new Ajax()
    ajax.testDoing()
    const drawSs =  new DrawSS(SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_NAME))
    drawSs.doing()
    this.fix()
  }
}
