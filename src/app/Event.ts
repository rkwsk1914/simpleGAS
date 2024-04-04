import * as Head from './Header'
import { App } from './App'

export class Event {
  app: App
  event: any
  range: any
  value: string
  oldValue: string
  nowSheetName: string

  constructor (app: App, event: any, nowSheetName: string) {
    this.app = app
    this.event = event
    this.range = this.event.range
    this.value = this.event.value
    this.oldValue = this.event.oldValue
    this.nowSheetName = nowSheetName

    // console.info(event)
    this.sheetBranch(nowSheetName)
  }

  test () {
  }

  /**
   * シートごとの処理分岐
   */
  sheetBranch (nowSheetName) {
    console.info(nowSheetName)
    switch (nowSheetName) {
      case Head.SHEET_FUNCTION_LIST[0]:
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
