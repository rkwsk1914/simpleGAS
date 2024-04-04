export class App {
  running: boolean

  constructor () {
    this.running = false
  }

  /**
   * 初期化処理
   */
  init () {
    if (this.running === true) {
      console.info('cancel')
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
    // const ajax = new Ajax()
    // ajax.testDoing()
    this.fix()
  }
}
