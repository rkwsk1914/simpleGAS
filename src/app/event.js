import * as Head from './header.js'

export class Event {
  constructor (app, event, nowSheetName) {
    this.app = app
    this.event = event
    this.range = this.event.range
    this.value = this.event.value
    this.oldValue = this.event.oldValue
    this.nowSheetName = nowSheetName

    // console.info(event)
    this.sheetBranch(nowSheetName)
  }

  /**
   * シートごとの処理分岐
   */
  sheetBranch (nowSheetName) {
    console.info(nowSheetName)
    switch (nowSheetName) {
      case Head.SHEET_FUNCTION_LIST:
        this.eventSheet()
        break
      default:
        break
    }
  }

  /**
   * イベント処理
   */
  eventSheet () {
    console.info(this.range.columnStart)
    switch (this.range.columnStart) {
      case Head.COL_A:
        console.info('IN')
        this.app.checkCallFunction(this.range.rowStart)
        break
      default:
        break
    }

    switch (this.range.rowStart) {
      case 1:
        break
      default:
        break
    }
  }
}
