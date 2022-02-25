class App {
  constructor() {
    this.running = this.initApp()
  }

  /**
   * 初期化処理
   */
  init () {
    //console.log("[App] initApp")
    let gasApp = new SimpleGoogleSpreadsheet (BOOK_URL, SHEET_DAY_REPORT)
    const running = gasApp.doReadSS(1, COL_A)
    gasApp = null
    return running
  }

  /**
   * 終了処理
   */
  fix () {
    //console.log("[App] resetRunnigStatusApp")
    let gasApp = new SimpleGoogleSpreadsheet (BOOK_URL, SHEET_DAY_REPORT)
    gasApp.doWriteSS(false, 1, COL_A)
    this.running = false
    gasApp = null
  }

  test () {

  }
}