class Event {
  constructor(event, nowSheetName) {
    this.event = event
    this.range = this.event.range
    this.value = this.event.value
    this.oldValue = this.event.oldValue
    this.nowSheet

    //console.log(event)
    this.sheetBranch(nowSheetName)
  }

  /**
   * シートごとの処理分岐
   */
  sheetBranch (nowSheetName) {
    //console.log(`[Event] sheetBranch [param] nowSheetName: ${nowSheetName}`)
    const book = SpreadsheetApp.openByUrl(BOOK_URL)
    this.nowSheet = book.getSheetByName(nowSheetName)

    switch (nowSheetName) {
      case SHEET_FUNCTION_LIST:
        console.log(SHEET_FUNCTION_LIST)
        break
      default:
        // console.log('[Event] cancel.')
        break
    }
  }

  /**
   * イベント処理
   */
  eventSheet () {
    //console.log("[Event] eventSheet")
    let app = new App ()
    switch (this.range.columnStart) {
      case COL_A:
        break
      default:
        // console.log('[Event] cancel.')
        break
    }

    switch (this.range.rowStart) {
      case 1:
        break
      default:
        // console.log('[Event] cancel.')
        break
    }

    app = null
  }
}